import Link from 'next/link';
import { Clock } from 'lucide-react';

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  date: Date;
  tags: string[];
}

export function NoteCard({ id, title, preview, date }: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`} className="block group">
      <article className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-200 h-full flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{preview || 'Sem conteúdo adicional...'}</p>
        
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
          <Clock size={12} />
          <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date)}</time>
        </div>
      </article>
    </Link>
  );
}
