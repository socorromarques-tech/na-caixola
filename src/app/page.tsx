import { NoteCard } from '@/components/NoteCard';
import { PenTool } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const user = await currentUser();
  const notes = user ? await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    take: 6
  }) : [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-5 md:p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-2 leading-tight">O que você aprendeu hoje{user ? `, ${user.firstName}` : ''}?</h2>
          <p className="text-indigo-100 mb-4 md:mb-8 max-w-lg text-sm md:text-base leading-relaxed">O conhecimento só se torna sabedoria quando é processado e armazenado. Guarde suas descobertas.</p>
          
          {/* Hide button on mobile as it is in bottom nav */}
          <div className="hidden md:flex gap-3">
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
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Anotações Recentes</h3>
          <Link href="/archive" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">
            Ver todas
          </Link>
        </div>

        {(!notes || notes.length === 0) ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="mb-4 inline-flex p-4 bg-slate-50 dark:bg-slate-700/50 rounded-full text-slate-400">
              <PenTool size={32} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Sua caixola está vazia!</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Que tal começar escrevendo algo novo?</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                id={note.id}
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
