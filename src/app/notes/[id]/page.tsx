import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { NoteActions } from '@/components/NoteActions';

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { userId } = await auth();
  
  if (!userId) {
     return <div className="p-8 text-center text-slate-400">Acesso não autorizado. Por favor, faça login.</div>; 
  }

  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note || note.userId !== userId) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors font-medium text-sm">
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <NoteActions id={note.id} />
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-tight">{note.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(note.createdAt)}</time>
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-300">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div 
        className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
}
