import React, { useMemo } from 'react';
import { Code2, Copy, AlignLeft, Download, CheckCircle2, Clock } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

interface CodePreviewProps {
  lang: string;
  configState: any;
  activeFile: string;
}

export function CodePreview({ lang, configState, activeFile }: CodePreviewProps) {
  const t = useTranslations(lang);
  // Syntax highlighting logic for JSON
  const highlightedCode = useMemo(() => {
    const jsonString = JSON.stringify(configState, null, 2);

    return jsonString.split('\n').map((line, i) => {
      // Basic syntax highlighter for JSON
      const parts = line.split(/(".*?"|true|false|\d+|[{}[\],])/g);

      return (
        <div key={`line-${i}`} className="table-row">
          <span className="table-cell text-right pr-4 select-none opacity-30 w-8">{i + 1}</span>
          <span className="table-cell">
            {parts.map((part, j) => {
              const partKey = `part-${i}-${j}`;
              if (part === '{' || part === '}' || part === '[' || part === ']' || part === ',') {
                return <span key={partKey} className="text-zinc-500">{part}</span>;
              }
              if (part === 'true' || part === 'false') {
                return <span key={partKey} className="text-zinc-200">{part}</span>;
              }
              if (/^\d+$/.test(part)) {
                return <span key={partKey} className="text-rose-400">{part}</span>;
              }
              if (part.startsWith('"') && part.endsWith('"')) {
                // Check if it's a key (followed by colon)
                if (j < parts.length - 1 && parts[j + 1].includes(':')) {
                  return <span key={partKey} className="text-[#8a95ff]">{part}</span>;
                }
                return <span key={partKey} className="text-emerald-400">{part}</span>;
              }
              return <span key={partKey} className="text-zinc-400">{part}</span>;
            })}
          </span>
        </div>
      );
    });
  }, [configState]);

  return (
    <section className="w-full h-full bg-zinc-950 flex flex-col font-mono" style={{ fontFamily: '"Geist Mono", monospace' }}>
      <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950 shrink-0">
        <div className="flex items-center gap-2 truncate pr-4">
          <Code2 className="w-4 h-4 text-[#8a95ff] shrink-0" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{activeFile}</span>
        </div>
        <div className="flex gap-4 shrink-0">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(configState, null, 2))}
            className="text-zinc-500 hover:text-white transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button type="button" className="text-zinc-500 hover:text-white transition-colors" title="Format">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button type="button" className="text-[#8a95ff] hover:text-white transition-colors" title="Download">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 text-[13px] leading-relaxed overflow-y-auto bg-zinc-950">
        <div className="table w-full">
          {highlightedCode}
        </div>
      </div>

      <div className="p-4 bg-zinc-900 text-[9px] border-t border-zinc-800 shrink-0">
        <div className="flex items-center justify-between text-zinc-500 tracking-wider">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#8a95ff]">
              <CheckCircle2 className="w-3 h-3" /> <span className="hidden sm:inline">{t('linter.validSchema')}</span>
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Clock className="w-3 h-3" /> {t('linter.sync')}
            </span>
          </div>
          <span className="uppercase">UTF-8</span>
        </div>
      </div>
    </section>
  );
}
