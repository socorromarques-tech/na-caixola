import Dexie, { Table } from 'dexie';

export interface Note {
  id?: number;
  title: string;
  content: string;
  plainText: string; // Plain text for search indexing
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class CaixolaDB extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('CaixolaDB');
    this.version(1).stores({
      notes: '++id, title, *tags, createdAt, updatedAt'
    });
  }
}

export const db = new CaixolaDB();
