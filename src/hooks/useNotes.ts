import { useLiveQuery } from 'dexie-react-hooks';
import { db, Note } from '@/lib/db';

export function useNotes() {
  const notes = useLiveQuery(() => db.notes.orderBy('updatedAt').reverse().toArray());
  
  async function addNote(title: string, content: string, plainText: string, tags: string[] = []) {
    await db.notes.add({
      title,
      content,
      plainText,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async function updateNote(id: number, updates: Partial<Note>) {
    await db.notes.update(id, { ...updates, updatedAt: new Date() });
  }

  async function deleteNote(id: number) {
    await db.notes.delete(id);
  }

  return { notes, addNote, updateNote, deleteNote };
}
