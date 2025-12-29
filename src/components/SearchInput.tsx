'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      router.replace(`/archive?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Pesquisar em suas notas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
