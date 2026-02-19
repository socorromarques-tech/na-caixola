import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;

  const note = await prisma.note.findUnique({
    where: { shareToken: token }
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <header className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">{note.title}</h1>
         <div className="text-sm text-slate-500 flex items-center gap-2">
           <time>{new Date(note.createdAt).toLocaleDateString('pt-BR')}</time>
           <span>•</span>
           <span className="flex gap-2">
             {note.tags.map(tag => (
               <span key={tag} className="text-indigo-600 dark:text-indigo-400">#{tag}</span>
             ))}
           </span>
         </div>
      </header>

      <article className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: note.content }} />
      </article>
      
      <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-sm">
        <p>Compartilhado via Na Caixola</p>
      </footer>
    </div>
  );
}
