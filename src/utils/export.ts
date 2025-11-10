/**
 * Export utilities for various formats
 * Placeholder for export functionality
 */

import { OcclusionCard } from './storage';
import JSZip from 'jszip';

export interface ExportOptions {
  format: 'anki' | 'json' | 'csv';
  includeImages: boolean;
  includeStats: boolean;
}

interface AnkiDeckData {
  decks: Record<string, { name: string; desc: string }>;
  notes: AnkiNote[];
  media: Record<string, string>;
}

interface AnkiNote {
  guid: string;
  model: string;
  fields: string[];
  tags: string[];
}

/**
 * Export cards to Anki format (APKG)
 */
export async function exportToAnki(
  cards: OcclusionCard[],
  options: ExportOptions
): Promise<Blob> {
  const zip = new JSZip();

  // Create media folder for images
  const mediaFolder = zip.folder('media') || zip;

  // Create deck file
  const deckData: AnkiDeckData = {
    decks: {
      '1': {
        name: 'Image Occlusion Cards',
        desc: 'Exported from Anki Free AI Image Occlusion',
      },
    },
    notes: [],
    media: {},
  };

  cards.forEach((card, index) => {
    const mediaId = index + 1;

    if (options.includeImages && card.imageData) {
      // Add image to media folder
      const imageFileName = `image_${mediaId}.png`;
      mediaFolder.file(imageFileName, dataURLtoBlob(card.imageData));
      deckData.media[mediaId.toString()] = imageFileName;
    }

    // Create note for Anki
    const note: AnkiNote = {
      guid: generateGuid(),
      model: 'Basic',
      fields: [
        card.title,
        generateOcclusionHTML(card),
        card.answer || '',
        card.tags.join(', '),
      ],
      tags: card.tags,
    };

    deckData.notes.push(note);
  });

  zip.file('collection.anki2', JSON.stringify(deckData));

  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Export cards to JSON format
 */
export async function exportToJSON(
  cards: OcclusionCard[],
  options: ExportOptions
): Promise<Blob> {
  const exportData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    cards: options.includeImages
      ? cards
      : cards.map((card) => ({
          ...card,
          imageData: null,
        })),
  };

  return new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
}

/**
 * Export cards to CSV format
 */
export async function exportToCSV(
  cards: OcclusionCard[],
  options: ExportOptions
): Promise<Blob> {
  const headers = ['Title', 'Answer', 'Tags', 'Created At', 'Updated At'];
  if (options.includeImages) {
    headers.push('Image Data');
  }

  const rows = [headers.join(',')];

  cards.forEach((card) => {
    const row = [
      escapeCSV(card.title),
      escapeCSV(card.answer),
      escapeCSV(card.tags.join(';')),
      card.createdAt.toISOString(),
      card.updatedAt.toISOString(),
    ];

    if (options.includeImages) {
      row.push(card.imageData || '');
    }

    rows.push(row.join(','));
  });

  return new Blob([rows.join('\n')], {
    type: 'text/csv',
  });
}

/**
 * Generate HTML for occlusion areas
 */
function generateOcclusionHTML(card: OcclusionCard): string {
  const occlusionsHTML = card.occlusions
    .map(
      (occ) => `
    <div class="occlusion" 
         style="position: absolute; left: ${occ.x}px; top: ${occ.y}px; 
                width: ${occ.width}px; height: ${occ.height}px;
                background-color: black; border: 1px solid #333;">
    </div>
  `
    )
    .join('');

  return `
    <div style="position: relative; display: inline-block;">
      <img src="${card.imageData}" alt="${card.title}" style="max-width: 100%;" />
      ${occlusionsHTML}
    </div>
  `;
}

/**
 * Convert data URL to Blob
 */
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

/**
 * Generate a UUID for Anki
 */
function generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Escape CSV field values
 */
function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
