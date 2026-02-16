'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/Editor';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { createNote } from '@/app/actions';

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [plainText, setPlainText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'saved' | 'saving' | 'unsaved'>('unsaved');

  const handleSave = async () => {
    if (!title.trim()) return;
    setStatus('saving');
    try {
      await createNote(title, content, plainText, tags);
      setStatus('saved');
      router.push('/');
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Erro ao salvar nota. Tente novamente.');
      setStatus('unsaved');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
              setStatus('unsaved');
            }}
            className="text-4xl font-bold bg-transparent border-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-slate-100 focus:outline-none focus:ring-0 w-full"
            autoFocus
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!title.trim() || status === 'saving'}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200 dark:shadow-none"
        >
          <Save size={18} />
          {status === 'saving' ? 'Salvando...' : 'Salvar na Caixola'}
        </button>
      </header>

      <Editor 
        content={content}
        tags={tags}
        onChange={(html, text) => {
          setContent(html);
          setPlainText(text);
          setStatus('unsaved');
        }} 
        onTagsChange={(newTags) => {
          setTags(newTags);
          setStatus('unsaved');
        }}
        status={status}
      />
    </div>
  );
}
