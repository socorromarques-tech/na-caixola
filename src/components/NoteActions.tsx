'use client'

import { deleteNote } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function NoteActions({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja apagar esta nota da sua caixola?')) {
      setIsDeleting(true);
      try {
        await deleteNote(id);
        // Router push might happen before revalidate finishes if we are not careful, 
        // but server action revalidates path.
        router.push('/'); 
      } catch (error) {
        console.error('Failed to delete:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link 
        href={`/notes/${id}/edit`}
        className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
        title="Editar nota"
      >
        <Pencil size={18} />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all disabled:opacity-50"
        title="Apagar nota"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
