'use client'

import { NoteCard } from '@/components/NoteCard';
import { PenTool } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  plainText: string;
  tags: string[];
  updatedAt: Date;
  isFavorite: boolean;
}

interface NotesListProps {
  notes: Note[];
}

export function NotesList({ notes }: NotesListProps) {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
        <div className="mb-4 inline-flex p-4 bg-slate-50 dark:bg-slate-700/50 rounded-full text-slate-400">
          <PenTool size={32} />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Sua caixola está vazia!</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Que tal começar escrevendo algo novo?</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          preview={note.plainText}
          date={note.updatedAt}
          tags={note.tags}
          isFavorite={note.isFavorite}
        />
      ))}
    </div>
  );
}
