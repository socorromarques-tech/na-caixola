'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createNote(title: string, content: string, plainText: string, tags: string[] = []) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await prisma.note.create({
    data: {
      userId,
      title,
      content,
      plainText,
      tags
    }
  })

  revalidatePath('/')
}

export async function updateNote(id: string, updates: { title?: string; content?: string; plainText?: string; tags?: string[] }) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const note = await prisma.note.findUnique({
    where: { id }
  })

  if (!note || note.userId !== userId) {
    throw new Error('Unauthorized or Note not found')
  }

  await prisma.note.update({
    where: { id },
    data: updates
  })

  revalidatePath('/')
  revalidatePath(`/notes/${id}`)
}

export async function deleteNote(id: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const note = await prisma.note.findUnique({
    where: { id }
  })

  if (!note || note.userId !== userId) {
    throw new Error('Unauthorized or Note not found')
  }

  await prisma.note.delete({
    where: { id }
  })

  revalidatePath('/')
}
