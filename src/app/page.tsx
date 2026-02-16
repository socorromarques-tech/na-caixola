import { NotesList } from '@/components/NotesList';
import { PenTool } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-5 md:p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-2 leading-tight">O que você aprendeu hoje?</h2>
          <p className="text-indigo-100 mb-4 md:mb-8 max-w-lg text-sm md:text-base leading-relaxed">O conhecimento só se torna sabedoria quando é processado e armazenado. Guarde suas descobertas.</p>
          
          <div className="hidden md:flex gap-3">
            <Link href="/new" className="bg-white text-indigo-600 px-5 py-2.5 rounded-full font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
              <PenTool size={18} />
              Escrever Nova Nota
            </Link>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Anotações Recentes</h3>
          <Link href="/archive" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">
            Ver todas
          </Link>
        </div>

        <NotesList />
      </section>
    </div>
  );
}
