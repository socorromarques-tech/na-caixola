'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Hash, Check, Clock, X } from 'lucide-react'

interface EditorProps {
  content?: string;
  tags?: string[];
  onChange: (html: string, text: string) => void;
  onTagsChange: (tags: string[]) => void;
  status: 'saved' | 'saving' | 'unsaved';
}

export function Editor({ content = '', tags = [], onChange, onTagsChange, status }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>(tags);
  const [tagInput, setTagInput] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentTags(tags);
  }, [tags]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Comece a escrever aqui...',
        emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-slate-400 before:float-left before:pointer-events-none before:h-0',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-indigo dark:prose-invert max-w-none focus:outline-none min-h-[300px]',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
      setCharCount(editor.storage.characterCount?.characters() || editor.getText().length);
    }
  })

  // Prevent hydration mismatch by only rendering editor on client
  if (!isMounted) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 min-h-[500px] flex items-center justify-center">
        <div className="text-slate-400 font-medium">Carregando editor...</div>
      </div>
    );
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...currentTags, tagInput.trim()];
      setCurrentTags(newTags);
      onTagsChange(newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    setCurrentTags(newTags);
    onTagsChange(newTags);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
      {/* Toolbar */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-2 flex items-center gap-1 flex-wrap bg-slate-50/50 dark:bg-slate-800/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Negrito"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Itálico"
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Título 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Título 2"
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Lista"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Lista Numerada"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('blockquote') ? 'bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
          title="Citação"
        >
          <Quote size={18} />
        </button>
        
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="text-slate-400">
            {editor.storage.characterCount?.characters() ?? editor.getText().length} caracteres
          </span>
          {status === 'saved' && (
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <Check size={14} /> Salvo
            </span>
          )}
          {status === 'saving' && (
            <span className="flex items-center gap-1.5 text-indigo-500 font-medium">
              <Clock size={14} className="animate-spin" /> Salvando...
            </span>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6">
        <EditorContent editor={editor} />
      </div>

      {/* Footer / Tags */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 mr-2">
            <Hash size={16} />
            <span className="text-sm font-medium">Tags:</span>
          </div>
          
          {currentTags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors group">
              {tag}
              <button onClick={() => removeTag(tag)} className="text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 ml-1">
                <X size={12} />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Adicionar tag..."
            className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 min-w-[120px]"
          />
        </div>
      </div>
    </div>
  )
}
