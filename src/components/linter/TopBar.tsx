import React, { useEffect, useState } from 'react';
import { Asterisk, Search, Moon, Sun, Languages } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export function TopBar() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Sync with initial document class
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    // Simple path-based lang sync
    const currentPath = window.location.pathname;
    const match = currentPath.match(/^\/([a-z]{2})\//);
    if (match) {
      setLang(match[1]);
    }
  }, []);

  const t = useTranslations(lang);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setTheme(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}/`, `/${newLang}/`);
    window.location.href = newPath;
  };

  return (
    <header className="bg-zinc-950 flex justify-between items-center w-full px-6 h-16 border-b border-zinc-800 z-50 text-sm tracking-tight sticky top-0 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Asterisk className="w-6 h-6 text-white" />
          <span className="text-xl font-bold tracking-tighter text-white font-title">PlayLint</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 mr-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input
            className="w-full bg-zinc-900 border border-zinc-800 focus:ring-1 focus:ring-white outline-none rounded-md pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-zinc-600 font-sans"
            placeholder={t('linter.search')}
            type="text"
          />
        </div>

        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded px-2 hover:bg-zinc-800 transition-colors">
          <Languages className="w-4 h-4 text-zinc-400 mr-1" />
          <select
            value={lang}
            onChange={handleLangChange}
            className="appearance-none bg-transparent border-none text-[10px] font-bold text-zinc-400 hover:text-white font-title py-1 outline-none cursor-pointer uppercase"
            title="Switch Language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>

        <button
          onClick={toggleTheme}
          className="text-zinc-400 hover:text-white transition-colors active:opacity-80 flex items-center justify-center p-2 rounded-lg"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
