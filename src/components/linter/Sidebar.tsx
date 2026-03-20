import React from 'react';
import {
  Plus,
  History,
  RotateCcw,
  Settings2,
  ChevronDown
} from 'lucide-react';
import { useTranslations } from '../../i18n/utils';
import { ENGINES, type ConfigEngine } from './rules';

interface SidebarProps {
  lang: string;
  activeEngine: ConfigEngine;
  activeVersion: string;
  onSelectEngine: (engine: ConfigEngine) => void;
  onSelectVersion: (version: string) => void;
  onAddConfig: () => void;
}

export function Sidebar({ lang, activeEngine, activeVersion, onSelectEngine, onSelectVersion, onAddConfig }: SidebarProps) {
  const t = useTranslations(lang);
  const engines = Object.values(ENGINES);
  const activeEngineDef = ENGINES[activeEngine];

  return (
    <aside className="w-full h-full bg-zinc-950 flex flex-col p-4 z-40 overflow-hidden">
      <div className="mb-6 px-2 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 shrink-0">
            <Settings2 className="text-white w-5 h-5" />
          </div>
          <div className="truncate flex-1">
            <h2 className="text-white font-black text-sm uppercase tracking-tight leading-none font-title truncate">{t('linter.config')}</h2>
            <div className="relative mt-1">
              <select
                value={activeVersion}
                onChange={(e) => onSelectVersion(e.target.value)}
                className="appearance-none bg-transparent border-none text-zinc-500 text-[10px] font-mono cursor-pointer outline-none hover:text-white transition-colors"
              >
                {activeEngineDef.versions.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onAddConfig}
        className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-2.5 rounded-lg text-xs hover:bg-zinc-200 transition-all mb-6 font-title shrink-0"
      >
        <Plus className="w-4 h-4 shrink-0" />
        <span className="truncate">{t('linter.addConfig')}</span>
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {engines.map((engine) => {
          const isActive = engine.name === activeEngine;
          const Icon = engine.icon;
          return (
            <div key={engine.name} className="relative group">
              <button
                onClick={() => onSelectEngine(engine.name as ConfigEngine)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                  isActive
                    ? 'bg-zinc-900 text-white font-bold'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 scale-95 duration-75'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-xs truncate">{engine.defaultFileName}</span>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-zinc-800 space-y-1 shrink-0">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-zinc-300 transition-all text-xs truncate">
          <History className="w-4 h-4 shrink-0" />
          <span className="truncate">{t('linter.versions')}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-zinc-300 transition-all text-xs truncate">
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span className="truncate">{t('linter.history')}</span>
        </button>
        <button className="w-full mt-4 bg-zinc-900 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-zinc-800 border border-zinc-800 transition-colors font-title truncate">
          {t('linter.exportConfig')}
        </button>
      </div>
    </aside>
  );
}
