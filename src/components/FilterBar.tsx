'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, SortAsc, SortDesc, Star } from 'lucide-react';

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter');
  const currentSort = searchParams.get('sort') || 'desc';

  const toggleFilter = (filter: string) => {
    const params = new URLSearchParams(window.location.search);
    if (currentFilter === filter) {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }
    router.replace(`/archive?${params.toString()}`);
  };

  const toggleSort = () => {
    const params = new URLSearchParams(window.location.search);
    const newSort = currentSort === 'desc' ? 'asc' : 'desc';
    params.set('sort', newSort);
    router.replace(`/archive?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => toggleFilter('favorites')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${currentFilter === 'favorites' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
      >
        <Star size={16} fill={currentFilter === 'favorites' ? 'currentColor' : 'none'} />
        Favoritos
      </button>

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

      <button
        onClick={toggleSort}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {currentSort === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
        {currentSort === 'desc' ? 'Mais recentes' : 'Mais antigas'}
      </button>
    </div>
  );
}
