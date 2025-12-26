'use client'

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { NoteCard } from '@/components/NoteCard';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ArchivePage() {
  const [search, setSearch] = useState('');
  
  const notes = useLiveQuery(
    async () => {
      if (!search.trim()) {
        return await db.notes.orderBy('updatedAt').reverse().toArray();
      }
      
      // Basic search implementation
      const allNotes = await db.notes.orderBy('updatedAt').reverse().toArray();
      const lowerSearch = search.toLowerCase();
      
      return allNotes.filter(note => 
        note.title.toLowerCase().includes(lowerSearch) || 
        note.plainText.toLowerCase().includes(lowerSearch)
      );
    },
    [search]
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">O Baú</h1>
        <p className="text-slate-500">Explore tudo o que você já guardou.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Pesquisar em suas notas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes?.map(note => (
          <NoteCard
            key={note.id}
            id={note.id!}
            title={note.title}
            preview={note.plainText}
            date={note.updatedAt}
            tags={note.tags}
          />
        ))}
      </div>

      {notes?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400">Nenhuma nota encontrada.</p>
        </div>
      )}
    </div>
  );
}
