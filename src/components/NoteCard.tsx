import Link from 'next/link';
import { Clock } from 'lucide-react';

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  date: Date;
  tags?: string[];
}

export function NoteCard({ id, title, preview, date, tags = [] }: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`} className="block group">
      <article className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-200 h-full flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 flex-1">{preview || 'Sem conteúdo adicional...'}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded text-xs font-medium">
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-slate-400">+{tags.length - 3}</span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-auto pt-3 border-t border-slate-50 dark:border-slate-700/50">
          <Clock size={12} />
          <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date)}</time>
        </div>
      </article>
    </Link>
  );
}
