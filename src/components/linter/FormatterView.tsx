import React, { useState } from 'react';
import { Info, ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslations, type LangCode } from '../../i18n/utils';
import { ENGINES, type ConfigEngine } from './rules';

interface FormatterViewProps {
  configState: any;
  onSettingChange: (path: string[], value: any) => void;
  lang: LangCode | string;
  activeEngine: ConfigEngine;
  activeVersion: string;
}

export function FormatterView({ configState, onSettingChange, lang, activeEngine, activeVersion }: FormatterViewProps) {
  const t = useTranslations(lang);
  const engineDef = ENGINES[activeEngine];

  // Filter rules based on active version
  const activeRules = engineDef.rules.filter(rule => {
    if (!rule.supportedVersions) return true;
    return rule.supportedVersions.includes(activeVersion);
  });

  return (
    <section className="flex-1 flex flex-col overflow-hidden border-r border-zinc-800 bg-zinc-950 h-full">
      <div className="flex-1 overflow-y-auto px-12 py-12 scroll-smooth">
        <div className="max-w-3xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">{engineDef.name}</span>
              <span className="text-zinc-700 text-xs">/</span>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">{activeVersion}</span>
              <span className="text-zinc-700 text-xs">/</span>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">CONFIGURATION</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4 font-title">{engineDef.name} {t('linter.config')}</h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl font-sans">
              {t('linter.description')}
            </p>
          </div>

          <div className="space-y-6 pb-24">
            {activeRules.map((rule, idx) => {
              const path = rule.id.split('.');
              let currentValue = configState;
              for (const p of path) {
                currentValue = currentValue?.[p];
              }

              // Determine if we have a preview to show based on current selection
              const hasPreview = rule.previewBefore && rule.previewAfterMap && String(currentValue) in rule.previewAfterMap;
              const currentPreview = hasPreview ? rule.previewAfterMap![String(currentValue)] : null;

              return (
                <RuleCard
                  key={rule.id}
                  title={rule.titleKey}
                  configKey={rule.id}
                  description={rule.descriptionKey}
                  defaultOpen={idx === 0}
                >
                  <div className="px-6 pb-6 pt-2">
                    {/* Select Options */}
                    {rule.options && rule.options.length > 0 ? (
                      <div className="flex flex-wrap bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 w-fit mb-6">
                        {rule.options.map((option) => (
                          <button
                            key={String(option.value)}
                            onClick={() => onSettingChange(path, option.value)}
                            className={`px-6 sm:px-8 py-2 text-xs font-bold rounded-lg transition-all ${
                              currentValue === option.value
                                ? 'text-black bg-white shadow-lg'
                                : 'text-zinc-500 hover:text-white'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      // Number input for widths etc
                      <div className="mb-6 w-fit relative">
                        <input
                          type="number"
                          value={currentValue !== undefined ? currentValue : ''}
                          onChange={(e) => onSettingChange(path, parseInt(e.target.value, 10))}
                          className="bg-zinc-900 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-lg py-2 px-4 text-white font-mono outline-none"
                        />
                      </div>
                    )}

                    {/* Code Preview */}
                    {hasPreview && (
                      <div className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800/80 mt-2 relative overflow-hidden group/preview">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 text-[11px] sm:text-[12px] leading-loose" style={{ fontFamily: '"Geist Mono", monospace' }}>

                          {/* Before */}
                          <div className="flex-1 w-full opacity-60">
                             <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-sans font-bold">Before</div>
                             <pre className="text-zinc-400 whitespace-pre-wrap font-mono">
                               {rule.previewBefore}
                             </pre>
                          </div>

                          {/* Arrow */}
                          <div className="hidden sm:flex shrink-0 items-center justify-center p-2 rounded-full bg-zinc-800/50">
                            <ArrowRight className="text-zinc-500 w-4 h-4" />
                          </div>

                          {/* After */}
                          <div className="flex-1 w-full bg-zinc-950/50 p-4 rounded-lg border border-zinc-800 shadow-inner">
                             <div className="text-[9px] uppercase tracking-widest text-[#8a95ff] mb-2 font-sans font-bold">After</div>
                             <pre className="text-zinc-300 whitespace-pre-wrap font-mono">
                               {currentPreview}
                             </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </RuleCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-12 py-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8a95ff] animate-pulse"></span>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{t('linter.workspaceSynced')}</span>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors">{t('linter.resetDefaults')}</button>
          <button className="px-8 py-2.5 text-xs font-bold text-black bg-white rounded-lg hover:bg-zinc-200 active:scale-95 transition-all">{t('linter.applyChanges')}</button>
        </div>
      </div>
    </section>
  );
}

function RuleCard({ title, configKey, description, children, defaultOpen = false }: { title: string, configKey: string, description?: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="group bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden transition-all duration-300"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-zinc-900/50 transition-colors list-none [&::-webkit-details-marker]:hidden select-none">
        <div>
          <h3 className="text-lg font-bold text-white mb-1.5 font-title">{title}</h3>
          <div className="flex items-center gap-3">
            <code className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded text-zinc-500 tracking-wider border border-zinc-800/50">{configKey}</code>
            {description && <span className="text-xs text-zinc-500 font-sans hidden sm:inline-block truncate max-w-sm">{description}</span>}
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Info className="w-4 h-4 text-zinc-600 hidden sm:block" />
          <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </summary>
      <div className="border-t border-zinc-800/30">
        {description && <p className="px-6 pt-4 text-xs text-zinc-400 font-sans sm:hidden leading-relaxed">{description}</p>}
        {children}
      </div>
    </details>
  );
}
