import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NoteCard } from '@/components/NoteCard';
import { SearchInput } from '@/components/SearchInput';
import { redirect } from 'next/navigation';

export default async function ArchivePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/'); // Or handle auth
  }

  const { q } = await searchParams;
  const search = q || '';

  const notes = await prisma.note.findMany({
    where: {
      userId: user.id,
      OR: search ? [
        { title: { contains: search, mode: 'insensitive' } },
        { plainText: { contains: search, mode: 'insensitive' } },
        // Prisma Postgres case insensitive mode
      ] : undefined
    },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">O Baú</h1>
        <p className="text-slate-500 dark:text-slate-400">Explore tudo o que você já guardou.</p>
      </header>

      <SearchInput />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            preview={note.plainText}
            date={note.updatedAt}
            tags={note.tags}
          />
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 dark:text-slate-500">Nenhuma nota encontrada.</p>
        </div>
      )}
    </div>
  );
}
