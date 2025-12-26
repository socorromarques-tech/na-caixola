import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Na Caixola - Seu Baú de Estudos',
  description: 'Guarde tudo o que você aprende.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 min-h-screen bg-slate-50/50">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
