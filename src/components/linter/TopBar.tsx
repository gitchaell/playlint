import React, { useEffect, useState, useRef } from 'react';
import { Asterisk, Search, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';
import { languages } from '../../i18n/ui';

export function TopBar() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

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

    // Click outside handler for language menu
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = useTranslations(lang);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setTheme(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleLangChange = (newLang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}/`, `/${newLang}/`);
    window.location.href = newPath;
  };

  return (
    <header className="bg-white dark:bg-zinc-950 flex justify-between items-center w-full px-6 h-16 border-b border-zinc-200 dark:border-zinc-800 z-50 text-sm tracking-tight sticky top-0 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Asterisk className="w-6 h-6 text-zinc-900 dark:text-white" />
          <span className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white font-title">PlayLint</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 mr-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
          <input
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white outline-none rounded-md pl-10 pr-4 py-1.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-600 font-sans"
            placeholder={t('linter.search')}
            type="text"
          />
        </div>

        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center justify-center gap-1.5 p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-5 h-5" />
            <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 z-50">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    handleLangChange(code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    lang === code
                      ? 'bg-zinc-100 dark:bg-zinc-900 font-bold text-zinc-900 dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors active:opacity-80 flex items-center justify-center p-2 rounded-lg"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
