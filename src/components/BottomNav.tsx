'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, Search, FolderOpen, LogIn } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 md:hidden z-50 transition-colors duration-200 safe-area-bottom">
      <div className="flex justify-around items-center">
        <NavButton href="/" icon={<LayoutDashboard size={24} />} active={pathname === '/'} />
        <NavButton href="/archive?q=" icon={<Search size={24} />} active={pathname.startsWith('/search')} />
        
        <div className="relative -top-6">
          <Link 
            href="/new" 
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-300 dark:shadow-indigo-900 flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all"
          >
            <PenTool size={24} />
          </Link>
        </div>

        <NavButton href="/archive" icon={<FolderOpen size={24} />} active={pathname === '/archive'} />
        
        <div className="flex flex-col items-center justify-center w-12">
            <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <LogIn size={24} />
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ href, icon, active }: { href: string; icon: React.ReactNode; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
        active 
          ? 'text-indigo-600 dark:text-indigo-400' 
          : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
      }`}
    >
      {icon}
    </Link>
  );
}
