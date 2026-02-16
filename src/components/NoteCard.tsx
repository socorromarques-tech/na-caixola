'use client'

import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { toggleFavorite } from '@/app/actions';
import { useState } from 'react';

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  date: Date;
  tags: string[];
  isFavorite: boolean;
  highlight?: string;
}

export function NoteCard({ id, title, preview, date, tags, isFavorite: initialFavorite, highlight }: NoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newState = !isFavorite;
    setIsFavorite(newState);
    try {
      await toggleFavorite(id, newState);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
      setIsFavorite(!newState); // Revert
    }
  };

  const HighlightText = ({ text, highlight }: { text: string, highlight?: string }) => {
    if (!highlight || !text) return <>{text}</>;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-slate-900 dark:text-slate-100 px-0.5 rounded">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Link href={`/notes/${id}`} className="block group relative h-full">
      <article className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-200 h-full flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 flex-1 pr-2">
             <HighlightText text={title} highlight={highlight} />
           </h3>
           <button
             onClick={handleToggleFavorite}
             className={`p-1 rounded-md transition-colors ${isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-slate-300 hover:text-yellow-500'}`}
           >
             <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
           </button>
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
          <HighlightText text={preview || 'Sem conteúdo adicional...'} highlight={highlight} />
        </p>
        
        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
           {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 rounded text-[10px] font-medium">
                  #<HighlightText text={tag} highlight={highlight} />
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded text-[10px] font-medium">+{tags.length - 3}</span>
              )}
            </div>
           )}
          
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(date))}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
