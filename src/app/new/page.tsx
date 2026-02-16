'use client'

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/Editor';
import { ArrowLeft, Save, Check, X } from 'lucide-react';
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

function generateId(): string {
  return 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [plainText, setPlainText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  const handleEditorChange = useCallback((html: string, text: string) => {
    setContent(html);
    setPlainText(text);
  }, []);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Por favor, adicione um título');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const notes: Note[] = JSON.parse(localStorage.getItem('caixola_notes') || '[]');
      
      const newNote: Note = {
        id: generateId(),
        title: title.trim(),
        content,
        plainText,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      notes.unshift(newNote);
      localStorage.setItem('caixola_notes', JSON.stringify(notes));
      
      setIsSaved(true);
      setTimeout(() => {
        router.push('/');
      }, 800);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      setError('Erro ao salvar nota. Tente novamente.');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          <input
            type="text"
            placeholder="Título da Nota"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            className="text-4xl font-bold bg-transparent border-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-slate-100 focus:outline-none focus:ring-0 w-full"
            autoFocus
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!title.trim() || isSaving || isSaved}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200 dark:shadow-none"
        >
          {isSaved ? (
            <>
              <Check size={18} />
              Salvo!
            </>
          ) : isSaving ? (
            <>
              <span className="animate-spin">⏳</span>
              Salvando...
            </>
          ) : (
            <>
              <Save size={18} />
              Salvar na Caixola
            </>
          )}
        </button>
      </header>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
            #{tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Adicionar tag..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleAddTag}
          className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200"
        />
      </div>

      <Editor 
        content={content} 
        onChange={handleEditorChange} 
      />
    </div>
  );
}
