'use client'

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NotePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const router = useRouter();
  
  const note = useLiveQuery(
    () => db.notes.get(id),
    [id]
  );

  // If loading or searching
  if (note === undefined) {
    return <div className="p-8 text-center text-slate-400">Carregando nota...</div>;
  }

  // If not found
  if (note === null) {
    return notFound();
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja apagar esta nota da sua caixola?')) {
      await db.notes.delete(id);
      router.push('/');
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm">
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <button 
            onClick={handleDelete}
            className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
            title="Apagar nota"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{note.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(note.createdAt)}</time>
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-600">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div 
        className="prose prose-lg prose-indigo max-w-none text-slate-700"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
}
