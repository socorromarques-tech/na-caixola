'use client'

import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from '@/components/NoteCard';
import { PenTool, Search } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { notes } = useNotes();
  const recentNotes = notes?.slice(0, 6); // Top 6 most recent

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">O que você aprendeu hoje?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg">O conhecimento só se torna sabedoria quando é processado e armazenado. Guarde suas descobertas.</p>
          
          <div className="flex gap-3">
            <Link href="/new" className="bg-white text-indigo-600 px-5 py-2.5 rounded-full font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
              <PenTool size={18} />
              Escrever Nova Nota
            </Link>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12" />
      </section>

      {/* Recent Notes Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Anotações Recentes</h3>
          <Link href="/archive" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
            Ver todas
          </Link>
        </div>

        {(!notes || notes.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="mb-4 inline-flex p-4 bg-slate-50 rounded-full text-slate-400">
              <PenTool size={32} />
            </div>
            <p className="text-slate-500 font-medium">Sua caixola está vazia!</p>
            <p className="text-sm text-slate-400 mt-1">Que tal começar escrevendo algo novo?</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNotes?.map(note => (
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
        )}
      </section>
    </div>
  );
}
