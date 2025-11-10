/**
 * PDF loading utilities
 * Placeholder for PDF.js integration
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<any>;
}

export interface PDFPage {
  getTextContent: () => Promise<any>;
  getViewport: (options: any) => any;
}

/**
 * Load a PDF document from a file or URL
 */
export async function loadPDFDocument(
  source: string | ArrayBuffer
): Promise<PDFDocument> {
  try {
    const loadingTask = pdfjsLib.getDocument(source as any);
    return await loadingTask.promise;
  } catch (error) {
    console.error('Failed to load PDF document:', error);
    throw error;
  }
}

/**
 * Extract text content from a PDF page
 */
export async function extractTextFromPage(page: PDFPage): Promise<string[]> {
  try {
    const textContent = await page.getTextContent();
    return textContent.items.map((item: any) => item.str).filter(Boolean);
  } catch (error) {
    console.error('Failed to extract text from page:', error);
    throw error;
  }
}

/**
 * Render PDF page to canvas
 */
export async function renderPageToCanvas(
  page: PDFPage,
  canvas: HTMLCanvasElement,
  scale: number = 1.5
): Promise<void> {
  try {
    const viewport = page.getViewport({ scale });
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get canvas context');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Use PDFPageViewport and PDFRenderParams interfaces
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await (page as any).render(renderContext).promise;
  } catch (error) {
    console.error('Failed to render page to canvas:', error);
    throw error;
  }
}
