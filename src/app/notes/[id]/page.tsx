'use client'

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
  plainText: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface NotePageProps {
  params: Promise<{ id: string }>
}

export default function NotePage({ params }: NotePageProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noteId, setNoteId] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      const { id } = await params;
      setNoteId(id);
      
      try {
        const notes: Note[] = JSON.parse(localStorage.getItem('caixola_notes') || '[]');
        const foundNote = notes.find(n => n.id === id);
        
        if (foundNote) {
          setNote(foundNote);
        }
      } catch (err) {
        console.error('Failed to load note:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadNote();
  }, [params]);

  const handleDelete = () => {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) return;
    
    try {
      const notes: Note[] = JSON.parse(localStorage.getItem('caixola_notes') || '[]');
      const filteredNotes = notes.filter(n => n.id !== noteId);
      localStorage.setItem('caixola_notes', JSON.stringify(filteredNotes));
      window.dispatchEvent(new Event('caixola_notes_updated'));
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert('Erro ao excluir nota');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-slate-400 font-medium">Carregando nota...</div>
      </div>
    );
  }

  if (!note) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors font-medium text-sm">
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <div className="flex items-center gap-2">
            <Link 
              href={`/notes/${note.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Pencil size={14} />
              Editar
            </Link>
            <button 
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
              Excluir
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-tight">{note.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(note.createdAt))}</time>
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-300">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div 
        className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
}
