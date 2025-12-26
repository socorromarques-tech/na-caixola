'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect } from 'react'

interface EditorProps {
  content?: string;
  onChange: (html: string, text: string) => void;
}

export function Editor({ content = '', onChange }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        class: 'prose prose-lg prose-indigo max-w-none focus:outline-none min-h-[300px]',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
    }
  })

  // Prevent hydration mismatch by only rendering editor on client
  if (!isMounted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[500px] flex items-center justify-center">
        <div className="text-slate-400 font-medium">Carregando editor...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[500px]">
      <EditorContent editor={editor} />
    </div>
  )
}
