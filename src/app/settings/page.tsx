import { UserProfile } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Configurações</h1>
      </header>

      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Aparência</h2>
        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-400">Tema do Aplicativo</span>
          <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded-lg">
             <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Clerk UserProfile component handles its own dark mode internally mostly, 
            but usually we just embed it. appearance prop helps match styles */}
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none rounded-none w-full",
              navbar: "hidden", // Hide sidebar of clerk component to keep it simple
            }
          }}
        />
      </section>
    </div>
  );
}
