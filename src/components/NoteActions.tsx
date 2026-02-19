'use client'

import { deleteNote } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Trash2, Pencil, Wand2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { NoteExports } from './NoteExports';
import type { Note } from '@prisma/client';
import { toast } from 'sonner';

export function NoteActions({ note }: { note: Note }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { id } = note;

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja apagar esta nota da sua caixola?')) {
      setIsDeleting(true);
      try {
        await deleteNote(id);
        toast.info('Nota apagada com sucesso.');
        router.push('/'); 
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Erro ao apagar nota.');
        setIsDeleting(false);
      }
    }
  };

  const handleAISummary = async () => {
    setIsSummarizing(true);
    toast.info('A IA está lendo sua nota...');
    
    // Simulating AI delay
    setTimeout(() => {
      setIsSummarizing(false);
      const fakeSummary = "Resumo da IA: Esta nota contém informações importantes sobre o projeto. A IA analisou o conteúdo e identificou os principais tópicos.";
      alert(fakeSummary); // For now, just alert. In real implementation, could show in modal or append to note.
      toast.success('Resumo gerado com sucesso! (Simulado)');
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAISummary}
        disabled={isSummarizing}
        className="text-slate-400 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all disabled:opacity-50"
        title="Resumir com IA"
      >
        <Wand2 size={18} />
      </button>

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

      <NoteExports 
        id={note.id}
        title={note.title}
        content={note.content}
        plainText={note.plainText}
        tags={note.tags}
        date={note.createdAt}
        shareToken={note.shareToken}
      />

      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

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
