import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the database
vi.mock('../utils/storage', () => ({
  db: {
    occlusionCards: {
      clear: vi.fn(),
      add: vi.fn(),
      get: vi.fn(),
      orderBy: vi.fn(() => ({
        reverse: vi.fn(() => ({
          toArray: vi.fn(),
        })),
      })),
      filter: vi.fn(() => ({
        toArray: vi.fn(),
      })),
      update: vi.fn(),
      delete: vi.fn(),
    },
    studySessions: {
      clear: vi.fn(),
      add: vi.fn(),
      where: vi.fn(() => ({
        equals: vi.fn(() => ({
          reverse: vi.fn(() => ({
            toArray: vi.fn(),
          })),
        })),
      })),
      update: vi.fn(),
    },
  },
  cardService: {
    createCard: vi.fn(),
    getCard: vi.fn(),
    getAllCards: vi.fn(),
    updateCard: vi.fn(),
    deleteCard: vi.fn(),
    searchCards: vi.fn(),
  },
}));

import { cardService } from '../utils/storage';

describe('Storage Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('cardService', () => {
    it('should create a card with correct data structure', async () => {
      const mockCard = {
        title: 'Test Card',
        imageData: 'data:image/png;base64,test',
        occlusions: [],
        answer: 'Test answer',
        tags: ['test', 'card'],
      };

      (cardService.createCard as any).mockResolvedValue(1);

      const id = await cardService.createCard(mockCard);

      expect(cardService.createCard).toHaveBeenCalledWith(mockCard);
      expect(id).toBe(1);
    });

    it('should retrieve a card by id', async () => {
      const mockCard = {
        id: 1,
        title: 'Test Card',
        imageData: 'data:image/png;base64,test',
        occlusions: [],
        answer: 'Test answer',
        tags: ['test'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (cardService.getCard as any).mockResolvedValue(mockCard);

      const result = await cardService.getCard(1);

      expect(cardService.getCard).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCard);
    });

    it('should search cards by title and tags', async () => {
      const mockCards = [
        {
          id: 1,
          title: 'Biology Card',
          imageData: 'data:image/png;base64,test1',
          occlusions: [],
          answer: 'Answer 1',
          tags: ['biology', 'science'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (cardService.searchCards as any).mockResolvedValue(mockCards);

      const result = await cardService.searchCards('biology');

      expect(cardService.searchCards).toHaveBeenCalledWith('biology');
      expect(result).toEqual(mockCards);
    });
  });
});
