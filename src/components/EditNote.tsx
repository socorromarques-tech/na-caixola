'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/Editor';
import { updateNote } from '@/app/actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NoteActions } from './NoteActions';
import type { Note } from '@prisma/client';
import { toast } from 'sonner';

interface EditNoteProps {
  note: Note;
}

export function EditNote({ note }: EditNoteProps) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [plainText, setPlainText] = useState(note.plainText || '');
  const [tags, setTags] = useState(note.tags);
  const [status, setStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Debounced auto-save
  useEffect(() => {
    if (status === 'saved') return;

    const timeoutId = setTimeout(async () => {
      setStatus('saving');
      try {
         await updateNote(note.id, { title, content, plainText, tags });
         setStatus('saved');
         toast.success('Nota salva automaticamente!', { duration: 1500 });
      } catch (err) {
         console.error(err);
         setStatus('unsaved');
         toast.error('Erro ao salvar nota.');
      }
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [title, content, tags, plainText, note.id, status]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <header className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-4 flex-1">
           <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
             <ArrowLeft size={20} />
           </Link>
           <input
             type="text"
             value={title}
             onChange={(e) => {
               setTitle(e.target.value);
               setStatus('unsaved');
             }}
             className="text-4xl font-bold bg-transparent border-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-slate-100 focus:outline-none focus:ring-0 w-full"
           />
         </div>
         <NoteActions note={note} />
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
