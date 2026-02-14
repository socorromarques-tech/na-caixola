'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Editor } from '@/components/Editor'
import { updateNote } from '@/app/actions'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface Note {
  id: string
  title: string
  content: string
  plainText: string
  tags: string[]
}

interface EditNotePageProps {
  params: Promise<{ id: string }>
}

export default function EditNotePage({ params }: EditNotePageProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [plainText, setPlainText] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [noteId, setNoteId] = useState('')

  useEffect(() => {
    const loadNote = async () => {
      const { id } = await params
      setNoteId(id)
      
      try {
        const response = await fetch(`/api/notes/${id}`)
        if (response.ok) {
          const note: Note = await response.json()
          setTitle(note.title)
          setContent(note.content)
          setPlainText(note.plainText)
        }
      } catch (error) {
        console.error('Failed to load note:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNote()
  }, [params])

  const handleSave = async () => {
    if (!title.trim() || !noteId) return
    setIsSaving(true)
    try {
      await updateNote(noteId, { title, content, plainText })
      router.push(`/notes/${noteId}`)
    } catch (error) {
      console.error('Failed to update note:', error)
      alert('Erro ao salvar nota. Tente novamente.')
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-slate-400 font-medium">Carregando nota...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/notes/${noteId}`} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          <input
            type="text"
            placeholder="Título da Nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold bg-transparent border-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-slate-100 focus:outline-none focus:ring-0 w-full"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!title.trim() || isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200 dark:shadow-none"
        >
          <Save size={18} />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </header>

      <Editor content={content} onChange={(html, text) => {
        setContent(html)
        setPlainText(text)
      }} />
    </div>
  )
}
