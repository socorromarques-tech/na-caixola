import type { Metadata } from 'next';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from 'sonner';

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
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className="bg-white dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 pb-24 md:pb-8">
                <header className="flex justify-end mb-4 md:mb-8">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                        Entrar
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    {/* Show UserButton on mobile too for now, to ensure access to settings/logout */}
                    <div className="block md:block">
                      <UserButton />
                    </div>
                  </SignedIn>
                </header>
                <div className="max-w-4xl mx-auto">
                  {children}
                </div>
              </main>
              <BottomNav />
              <Toaster position="bottom-right" richColors />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
