/**
 * OCR utilities using Tesseract.js
 * Placeholder for OCR functionality
 */

import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
  words: OCRWord[];
  lines: OCRLine[];
}

export interface OCRWord {
  text: string;
  confidence: number;
  bbox: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
  baseline: number;
  font_size: number;
}

export interface OCRLine {
  text: string;
  confidence: number;
  words: OCRWord[];
  bbox: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
}

/**
 * Perform OCR on an image element or canvas
 */
export async function recognizeText(
  image: HTMLImageElement | HTMLCanvasElement,
  options: {
    language?: string;
  } = {}
): Promise<OCRResult> {
  const { language = 'eng' } = options;

  try {
    const result = await Tesseract.recognize(image, language, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    // Transform Tesseract result to our format
    return transformTesseractResult(result.data);
  } catch (error) {
    console.error('OCR failed:', error);
    throw error;
  }
}

/**
 * Perform OCR on image data URL
 */
export async function recognizeTextFromDataURL(
  dataURL: string,
  options: {
    language?: string;
  } = {}
): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(
      dataURL,
      options.language || 'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      }
    );

    return transformTesseractResult(result.data);
  } catch (error) {
    console.error('OCR failed:', error);
    throw error;
  }
}

/**
 * Extract text from a specific region of an image
 */
export async function recognizeTextInRegion(
  image: HTMLImageElement | HTMLCanvasElement,
  region: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  options: {
    language?: string;
  } = {}
): Promise<OCRResult> {
  // Create a temporary canvas for the region
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  canvas.width = region.width;
  canvas.height = region.height;

  // Draw the specific region
  ctx.drawImage(
    image,
    region.x,
    region.y,
    region.width,
    region.height,
    0,
    0,
    region.width,
    region.height
  );

  return await recognizeText(canvas, options);
}

/**
 * Get available OCR languages
 */
export async function getAvailableLanguages(): Promise<string[]> {
  try {
    // Return common languages as placeholder
    return [
      'eng',
      'spa',
      'fra',
      'deu',
      'ita',
      'por',
      'rus',
      'jpn',
      'chi_sim',
      'chi_tra',
      'kor',
    ];
  } catch (error) {
    console.error('Failed to get available languages:', error);
    return ['eng']; // Fallback to English
  }
}

/**
 * Transform Tesseract result to our OCR result format
 */
function transformTesseractResult(data: any): OCRResult {
  // Handle different Tesseract.js versions
  const words: OCRWord[] = (data.words || []).map((word: any) => ({
    text: word.text || '',
    confidence: word.confidence || 0,
    bbox: {
      x0: word.bbox?.x0 || 0,
      y0: word.bbox?.y0 || 0,
      x1: word.bbox?.x1 || 0,
      y1: word.bbox?.y1 || 0,
    },
    baseline: word.baseline || 0,
    font_size: word.font_size || 12,
  }));

  const lines: OCRLine[] = (data.lines || []).map((line: any) => ({
    text: line.text || '',
    confidence: line.confidence || 0,
    words: (line.words || []).map((word: any) => ({
      text: word.text || '',
      confidence: word.confidence || 0,
      bbox: {
        x0: word.bbox?.x0 || 0,
        y0: word.bbox?.y0 || 0,
        x1: word.bbox?.x1 || 0,
        y1: word.bbox?.y1 || 0,
      },
      baseline: word.baseline || 0,
      font_size: word.font_size || 12,
    })),
    bbox: {
      x0: line.bbox?.x0 || 0,
      y0: line.bbox?.y0 || 0,
      x1: line.bbox?.x1 || 0,
      y1: line.bbox?.y1 || 0,
    },
  }));

  return {
    text: data.text || '',
    confidence: data.confidence || 0,
    words,
    lines,
  };
}
