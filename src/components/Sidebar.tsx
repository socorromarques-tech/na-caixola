import { LayoutDashboard, PenTool, Search, FolderOpen, Settings } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen hidden md:flex flex-col p-4 fixed left-0 top-0 transition-colors duration-200">
      <div className="mb-8 pl-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Na Caixola</h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Seu Baú de Estudos</p>
      </div>

      <nav className="space-y-1 flex-1">
        <NavLink href="/" icon={<LayoutDashboard size={20} />} label="Início" />
        <NavLink href="/new" icon={<PenTool size={20} />} label="Escrever" />
        <NavLink href="/archive?q=" icon={<Search size={20} />} label="Buscar" />
        <NavLink href="/archive" icon={<FolderOpen size={20} />} label="O Baú" />
      </nav>

      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
         <span className="text-xs text-slate-400 font-medium pl-3">Tema</span>
         <ThemeToggle />
      </div>
    </aside>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm rounded-lg transition-all duration-200 group">
      <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
