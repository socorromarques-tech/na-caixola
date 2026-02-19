'use client'

import { useState, useRef, useEffect } from 'react';
import { Download, Share2, FileText, FileCode, Archive, X, Check, Copy, Link as LinkIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { togglePublicLink } from '@/app/actions';

interface NoteExportsProps {
  id: string;
  title: string;
  content: string; // HTML content for PDF
  plainText: string; // Text for MD
  tags: string[];
  date: Date;
  shareToken?: string | null;
}

export function NoteExports({ id, title, content, plainText, tags, date, shareToken: initialToken }: NoteExportsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(initialToken || null);
  const [isSharing, setIsSharing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleExportPDF = async () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; color: #333;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">${title}</h1>
        <div style="font-size: 12px; color: #666; margin-bottom: 20px;">
          ${new Date(date).toLocaleDateString('pt-BR')} | Tags: ${tags.join(', ')}
        </div>
        <div style="font-size: 14px; line-height: 1.6;">
          ${content}
        </div>
      </div>
    `;
    element.style.width = '595px'; // A4 width at 72dpi approx
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    } catch (err) {
      console.error('PDF Export failed', err);
      alert('Erro ao gerar PDF');
    } finally {
      document.body.removeChild(element);
      setIsOpen(false);
    }
  };

  const handleExportMarkdown = () => {
    const frontmatter = `---\ntitle: ${title}\ndate: ${new Date(date).toISOString()}\ntags: [${tags.join(', ')}]\n---\n\n`;
    const blob = new Blob([frontmatter + plainText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleToggleShare = async () => {
    setIsSharing(true);
    try {
      const newToken = await togglePublicLink(id, !shareToken);
      setShareToken(newToken as string | null);
    } catch (err) {
      console.error('Share toggle failed', err);
      alert('Erro ao alterar status de compartilhamento');
    } finally {
      setIsSharing(false);
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/share/${shareToken}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado!');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
        title="Exportar / Compartilhar"
      >
        <Share2 size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-100 dark:border-slate-700/50">
            <div className="text-xs font-semibold text-slate-400 uppercase px-3 py-2">Exportar</div>
            <button onClick={handleExportPDF} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors text-left">
              <FileText size={16} className="text-red-500" />
              <span>Gerar PDF</span>
            </button>
            <button onClick={handleExportMarkdown} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors text-left">
              <FileCode size={16} className="text-slate-900 dark:text-slate-100" />
              <span>Arquivo Markdown</span>
            </button>
          </div>

          <div className="p-2 bg-slate-50 dark:bg-slate-800/50">
             <div className="text-xs font-semibold text-slate-400 uppercase px-3 py-2">Compartilhar</div>
             <div className="px-3 pb-2 pt-0">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Link Público</span>
                 <button 
                  onClick={handleToggleShare}
                  disabled={isSharing}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${shareToken ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-600'}`}
                 >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${shareToken ? 'translate-x-5' : 'translate-x-1'}`} />
                 </button>
               </div>
               
               {shareToken && (
                 <div className="flex items-center gap-2 mt-2">
                   <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-500 truncate select-all">
                     {typeof window !== 'undefined' ? `${window.location.origin}/share/${shareToken}` : '...'}
                   </div>
                   <button onClick={copyLink} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors" title="Copiar Link">
                     <Copy size={14} />
                   </button>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
