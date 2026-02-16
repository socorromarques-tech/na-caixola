import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { EditNote } from '@/components/EditNote';

interface NotePageProps {
  params: Promise<{ id: string }>
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) return notFound();

  const note = await prisma.note.findUnique({
    where: { id, userId }
  });

  if (!note) return notFound();

  return <EditNote note={note} />;
}
