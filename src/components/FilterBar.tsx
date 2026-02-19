'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { SortAsc, SortDesc, Star, Calendar } from 'lucide-react';

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter');
  const currentSort = searchParams.get('sort') || 'desc';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

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

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.replace(`/archive?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => toggleFilter('favorites')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${currentFilter === 'favorites' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
      >
        <Star size={16} fill={currentFilter === 'favorites' ? 'currentColor' : 'none'} />
        Favoritos
      </button>

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2 flex-shrink-0" />

      <button
        onClick={toggleSort}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
      >
        {currentSort === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
        {currentSort === 'desc' ? 'Recentes' : 'Antigas'}
      </button>

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2 flex-shrink-0" />

      <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 shadow-sm">
        <Calendar size={14} className="text-slate-400" />
        <input 
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none w-[100px]"
        />
        <span className="text-slate-300">-</span>
        <input 
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className="bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none w-[100px]"
        />
      </div>
    </div>
  );
}
