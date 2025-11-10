/**
 * Storage utilities using IndexedDB via Dexie
 * Placeholder for database operations
 */

import Dexie, { Table } from 'dexie';

export interface OcclusionCard {
  id?: number;
  title: string;
  imageData: string;
  occlusions: OcclusionArea[];
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface OcclusionArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rectangle' | 'ellipse' | 'polygon';
  revealed: boolean;
}

export interface StudySession {
  id?: number;
  cardId: number;
  startTime: Date;
  endTime?: Date;
  score: number;
  attempts: number;
}

class AppDatabase extends Dexie {
  occlusionCards!: Table<OcclusionCard>;
  studySessions!: Table<StudySession>;

  constructor() {
    super('AnkiImageOcclusionDB');

    this.version(1).stores({
      occlusionCards: '++id, title, createdAt, updatedAt, tags',
      studySessions: '++id, cardId, startTime, score',
    });
  }
}

export const db = new AppDatabase();

/**
 * Card management operations
 */
export const cardService = {
  async createCard(
    card: Omit<OcclusionCard, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<number> {
    const now = new Date();
    const id = await db.occlusionCards.add({
      ...card,
      createdAt: now,
      updatedAt: now,
    });
    return Number(id);
  },

  async getCard(id: number): Promise<OcclusionCard | undefined> {
    return await db.occlusionCards.get(id);
  },

  async getAllCards(): Promise<OcclusionCard[]> {
    return await db.occlusionCards.orderBy('updatedAt').reverse().toArray();
  },

  async updateCard(id: number, updates: Partial<OcclusionCard>): Promise<void> {
    await db.occlusionCards.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async deleteCard(id: number): Promise<void> {
    await db.occlusionCards.delete(id);
  },

  async searchCards(query: string): Promise<OcclusionCard[]> {
    return await db.occlusionCards
      .filter(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      )
      .toArray();
  },
};

/**
 * Study session operations
 */
export const studyService = {
  async startSession(cardId: number): Promise<number> {
    const id = await db.studySessions.add({
      cardId,
      startTime: new Date(),
      score: 0,
      attempts: 0,
    });
    return Number(id);
  },

  async endSession(id: number, score: number): Promise<void> {
    await db.studySessions.update(id, {
      endTime: new Date(),
      score,
    });
  },

  async getSessionsForCard(cardId: number): Promise<StudySession[]> {
    return await db.studySessions
      .where('cardId')
      .equals(cardId)
      .reverse()
      .toArray();
  },
};
