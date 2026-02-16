'use client'

import { useState, useEffect } from 'react';
import { NoteCard } from '@/components/NoteCard';
import { PenTool } from 'lucide-react';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  plainText: string;
  tags: string[];
  updatedAt: string;
}

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes: Note[] = JSON.parse(localStorage.getItem('caixola_notes') || '[]');
        const sortedNotes = storedNotes.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setNotes(sortedNotes.slice(0, 6));
      } catch (err) {
        console.error('Failed to load notes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
    
    const handleStorageChange = () => loadNotes();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('caixola_notes_updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('caixola_notes_updated', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

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
          date={new Date(note.updatedAt)}
          tags={note.tags}
        />
      ))}
    </div>
  );
}
