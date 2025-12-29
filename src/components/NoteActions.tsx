'use client'

import { deleteNote } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all disabled:opacity-50"
      title="Apagar nota"
    >
      <Trash2 size={18} />
    </button>
  );
}
