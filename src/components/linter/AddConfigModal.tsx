import React, { useState } from 'react';
import {
  X,
  FileJson,
  ChevronDown,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { ENGINES, type ConfigEngine } from './rules';
import { useTranslations } from '../../i18n/utils';

interface AddConfigModalProps {
  lang: string;
  onClose: () => void;
}

export function AddConfigModal({ lang, onClose }: AddConfigModalProps) {
  const t = useTranslations(lang);
  const [selectedEngine, setSelectedEngine] = useState<ConfigEngine>('Biome');
  const [selectedTemplate, setSelectedTemplate] = useState('Standard Recommended');
  const [fileName, setFileName] = useState('biome.json');

  const tools = Object.values(ENGINES);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-2xl bg-zinc-950 rounded-xl flex flex-col shadow-2xl border border-zinc-800 font-sans max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between w-full px-6 h-16 border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:bg-zinc-900 transition-colors rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-lg tracking-tight text-white font-title">{t('modal.title')}</h2>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 font-bold text-white hover:bg-zinc-900 transition-colors rounded-lg text-sm font-title"
            >
              {t('modal.cancel')}
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-4">
              <h3 className="font-title font-bold text-xs uppercase tracking-widest text-zinc-500">{t('modal.selectEngine')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {tools.map((tool) => {
                  const isActive = selectedEngine === tool.name;
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.name}
                      onClick={() => {
                        setSelectedEngine(tool.name as ConfigEngine);
                        setFileName(tool.defaultFileName);
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'border-white bg-zinc-900 shadow-lg scale-[1.02]'
                          : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <div className={`w-12 h-12 mb-2 flex items-center justify-center rounded-lg ${
                        isActive ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`font-title font-bold text-sm ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                        {tool.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-title font-bold text-xs uppercase tracking-widest text-zinc-500 ml-1">{t('modal.configName')}</label>
                <div className="relative">
                  <input
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-lg py-3 px-4 text-white placeholder:text-zinc-600 transition-all font-mono text-sm outline-none"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    type="text"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FileJson className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-title font-bold text-xs uppercase tracking-widest text-zinc-500 ml-1">{t('modal.toolVersion')}</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-zinc-900 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-lg py-3 px-4 text-white font-sans text-sm outline-none cursor-pointer">
                    <option>v2.4.0 (Latest stable)</option>
                    <option>v2.3.1</option>
                    <option>v2.0.0-beta</option>
                    <option>v1.9.4</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-title font-bold text-xs uppercase tracking-widest text-zinc-500 ml-1">{t('modal.starterTemplate')}</h3>
              <div className="space-y-3">
                <div
                  onClick={() => setSelectedTemplate('Standard Recommended')}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                    selectedTemplate === 'Standard Recommended'
                      ? 'bg-zinc-900 border-white'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedTemplate === 'Standard Recommended' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 group-hover:text-white'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-title font-bold ${selectedTemplate === 'Standard Recommended' ? 'text-white' : 'text-zinc-300'}`}>{t('modal.template.standard')}</span>
                      <div className={`w-4 h-4 rounded-full border-2 ${selectedTemplate === 'Standard Recommended' ? 'border-white bg-white' : 'border-zinc-700'}`}></div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{t('modal.template.standardDesc')}</p>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedTemplate('Minimalist')}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                    selectedTemplate === 'Minimalist'
                      ? 'bg-zinc-900 border-white'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedTemplate === 'Minimalist' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 group-hover:text-white'
                  }`}>
                    <Filter className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-title font-bold ${selectedTemplate === 'Minimalist' ? 'text-white' : 'text-zinc-300'}`}>{t('modal.template.minimalist')}</span>
                      <div className={`w-4 h-4 rounded-full border-2 ${selectedTemplate === 'Minimalist' ? 'border-white bg-white' : 'border-zinc-700'}`}></div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{t('modal.template.minimalistDesc')}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-zinc-800 shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-white text-black font-title font-extrabold text-base py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.98] transition-all"
            >
              {t('modal.createConfig')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
