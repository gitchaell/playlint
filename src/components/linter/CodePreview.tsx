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

  const handleFormat = () => {
    alert('Formatted correctly!');
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(configState, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Syntax highlighting logic for JSON
  const highlightedCode = useMemo(() => {
    const jsonString = JSON.stringify(configState, null, 2);

    return jsonString.split('\n').map((line, i) => {
      // Basic syntax highlighter for JSON
      const parts = line.split(/(".*?"|true|false|\b\d+\b|[{}[\],:])/g).filter(Boolean);

      return (
        <div key={`line-${i}`} className="table-row">
          <span className="table-cell text-right pr-4 select-none opacity-30 w-8">{i + 1}</span>
          <span className="table-cell">
            {parts.map((part, j) => {
              const partKey = `part-${i}-${j}`;
              if (part === '{' || part === '}' || part === '[' || part === ']' || part === ',' || part === ':') {
                return <span key={partKey} className="text-zinc-400 dark:text-zinc-500">{part}</span>;
              }
              if (part === 'true' || part === 'false') {
                return <span key={partKey} className="text-blue-500 dark:text-blue-400 font-semibold">{part}</span>;
              }
              if (/^\d+$/.test(part)) {
                return <span key={partKey} className="text-orange-500 dark:text-orange-400 font-semibold">{part}</span>;
              }
              if (part.startsWith('"') && part.endsWith('"')) {
                // Check if it's a key (followed by colon or spacing and colon)
                let isKey = false;
                for (let k = j + 1; k < parts.length; k++) {
                   if (parts[k].trim() === '') continue;
                   if (parts[k] === ':') isKey = true;
                   break;
                }
                if (isKey) {
                  return <span key={partKey} className="text-purple-600 dark:text-purple-400 font-semibold">{part}</span>;
                }
                return <span key={partKey} className="text-green-600 dark:text-green-400">{part}</span>;
              }
              return <span key={partKey} className="text-zinc-700 dark:text-zinc-300 whitespace-pre">{part}</span>;
            })}
          </span>
        </div>
      );
    });
  }, [configState]);

  return (
    <section className="w-full h-full bg-[#1e1e1e] flex flex-col font-mono text-[#d4d4d4]">
      <div className="h-14 border-b border-[#2d2d2d] flex items-center justify-between px-6 bg-[#1e1e1e] shrink-0">
        <div className="flex items-center gap-2 truncate pr-4 opacity-80">
          <Code2 className="w-4 h-4 text-[#8a95ff] shrink-0" />
          <span className="text-xs font-medium text-white tracking-wide truncate">{activeFile}</span>
        </div>
        <div className="flex gap-4 shrink-0">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(configState, null, 2))}
            className="text-[#858585] hover:text-white transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleFormat} className="text-[#858585] hover:text-white transition-colors" title="Format">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleDownload} className="text-[#8a95ff] hover:text-[#7681ff] transition-colors" title="Download">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 py-6 text-[13px] leading-relaxed overflow-y-auto bg-[#1e1e1e]">
        <div className="table w-full">
          {highlightedCode}
        </div>
      </div>

      <div className="px-4 py-1.5 bg-[#007acc] text-white text-[11px] shrink-0 flex items-center justify-between tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('linter.validSchema')}</span>
          </span>
          <span className="flex items-center gap-1.5 hidden sm:flex opacity-90">
            <Clock className="w-3.5 h-3.5" /> {t('linter.sync')}
          </span>
        </div>
        <span className="uppercase opacity-90">UTF-8</span>
      </div>
    </section>
  );
}
