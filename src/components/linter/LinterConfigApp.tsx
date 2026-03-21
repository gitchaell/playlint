import React, { useState } from 'react';
import * as ResizablePanels from 'react-resizable-panels';
import { AddConfigModal } from './AddConfigModal';
import { CodePreview } from './CodePreview';
import { FormatterView } from './FormatterView';
import { type ConfigEngine, ENGINES } from './rules';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useLocalStorage } from './useLocalStorage';

const PanelGroup =
	(ResizablePanels as any).PanelGroup || (ResizablePanels as any).Group;
const PanelResizeHandle =
	(ResizablePanels as any).PanelResizeHandle ||
	(ResizablePanels as any).Separator;
const Panel = ResizablePanels.Panel;

export function LinterConfigApp({ lang }: { lang: string }) {
	const [activeEngine, setActiveEngine] = useLocalStorage<ConfigEngine>(
		'playlint-active-engine',
		'Biome',
	);
	// Store the active version selection for each engine
	const [activeVersions, setActiveVersions] = useLocalStorage<
		Record<ConfigEngine, string>
	>('playlint-active-versions', {
		Biome: ENGINES.Biome.versions[ENGINES.Biome.versions.length - 1].id,
		Prettier:
			ENGINES.Prettier.versions[ENGINES.Prettier.versions.length - 1].id,
		ESLint: ENGINES.ESLint.versions[ENGINES.ESLint.versions.length - 1].id,
		Oxlint: ENGINES.Oxlint.versions[ENGINES.Oxlint.versions.length - 1].id,
		Stylelint:
			ENGINES.Stylelint.versions[ENGINES.Stylelint.versions.length - 1].id,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Create a deeply nested state structure to track configuration states
	// by Engine -> by Version.
	const [states, setStates] = useLocalStorage<
		Record<ConfigEngine, Record<string, any>>
	>('playlint-states', () => {
		const initialState: any = {};
		for (const [engineName, engineDef] of Object.entries(ENGINES)) {
			initialState[engineName] = {};
			for (const v of engineDef.versions) {
				initialState[engineName][v.id] = v.defaultState;
			}
		}
		return initialState;
	});

	const handleSettingChange = (path: string[], value: any) => {
		const vId = activeVersions[activeEngine];
		setStates((prev) => {
			const versionState = structuredClone(prev[activeEngine][vId]);
			let current = versionState;
			for (let i = 0; i < path.length - 1; i++) {
				if (!current[path[i]]) current[path[i]] = {};
				current = current[path[i]];
			}
			current[path[path.length - 1]] = value;
			return {
				...prev,
				[activeEngine]: {
					...prev[activeEngine],
					[vId]: versionState,
				},
			};
		});
	};

	const handleResetDefaults = () => {
		const vId = activeVersions[activeEngine];
		const defaultState =
			ENGINES[activeEngine].versions.find((v) => v.id === vId)?.defaultState ||
			{};
		setStates((prev) => ({
			...prev,
			[activeEngine]: {
				...prev[activeEngine],
				[vId]: defaultState,
			},
		}));
	};

	const handleEngineChange = (engine: ConfigEngine) => {
		setActiveEngine(engine);
	};

	const handleVersionChange = (versionId: string) => {
		setActiveVersions((prev) => ({ ...prev, [activeEngine]: versionId }));
	};

	const currentVersionId = activeVersions[activeEngine];
	const currentState = states[activeEngine][currentVersionId];

	// Mobile tab state
	const [activeMobileTab, setActiveMobileTab] = useState<
		'sidebar' | 'editor' | 'preview'
	>('editor');

	return (
		<div className='bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-zinc-300 dark:selection:bg-zinc-800 h-screen overflow-hidden flex flex-col font-sans'>
			<TopBar />

			{/* Mobile Layout */}
			<div className='flex flex-col md:hidden flex-1 overflow-hidden w-full'>
				{/* Mobile Tabs Header */}
				<div className='flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0 overflow-x-auto'>
					<button
						onClick={() => setActiveMobileTab('sidebar')}
						className={`flex-1 py-3 px-4 text-xs font-bold font-title whitespace-nowrap transition-colors ${activeMobileTab === 'sidebar' ? 'text-zinc-900 dark:text-white border-b-2 border-[#8a95ff]' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
					>
						Files
					</button>
					<button
						onClick={() => setActiveMobileTab('editor')}
						className={`flex-1 py-3 px-4 text-xs font-bold font-title whitespace-nowrap transition-colors ${activeMobileTab === 'editor' ? 'text-zinc-900 dark:text-white border-b-2 border-[#8a95ff]' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
					>
						Configuration
					</button>
					<button
						onClick={() => setActiveMobileTab('preview')}
						className={`flex-1 py-3 px-4 text-xs font-bold font-title whitespace-nowrap transition-colors ${activeMobileTab === 'preview' ? 'text-zinc-900 dark:text-white border-b-2 border-[#8a95ff]' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
					>
						Code Preview
					</button>
				</div>

				{/* Mobile Tab Content */}
				<div className='flex-1 overflow-hidden relative'>
					{activeMobileTab === 'sidebar' && (
						<div className='absolute inset-0 overflow-y-auto bg-white dark:bg-zinc-900'>
							<Sidebar
								lang={lang}
								activeEngine={activeEngine}
								activeVersion={currentVersionId}
								onSelectEngine={handleEngineChange}
								onSelectVersion={handleVersionChange}
								onAddConfig={() => setIsModalOpen(true)}
							/>
						</div>
					)}
					{activeMobileTab === 'editor' && (
						<div className='absolute inset-0 overflow-y-auto bg-white dark:bg-zinc-900'>
							<FormatterView
								lang={lang}
								activeEngine={activeEngine}
								activeVersion={currentVersionId}
								configState={currentState}
								onSettingChange={handleSettingChange}
								onResetDefaults={handleResetDefaults}
							/>
						</div>
					)}
					{activeMobileTab === 'preview' && (
						<div className='absolute inset-0 bg-zinc-900'>
							<CodePreview
								lang={lang}
								activeFile={ENGINES[activeEngine].defaultFileName}
								configState={currentState}
							/>
						</div>
					)}
				</div>
			</div>

			{/* Desktop Layout */}
			<div className='hidden md:flex flex-1 min-h-0 relative w-full h-full'>
				<PanelGroup direction='horizontal' className='h-full w-full'>
					<Panel
						defaultSize={20}
						minSize={15}
						collapsible={true}
						className='h-full hidden md:block min-w-0'
					>
						<Sidebar
							lang={lang}
							activeEngine={activeEngine}
							activeVersion={currentVersionId}
							onSelectEngine={handleEngineChange}
							onSelectVersion={handleVersionChange}
							onAddConfig={() => setIsModalOpen(true)}
						/>
					</Panel>

					<PanelResizeHandle className='hidden md:block w-1 bg-zinc-50 dark:bg-zinc-950 border-x border-zinc-200 dark:border-zinc-900 hover:bg-[#8a95ff] active:bg-[#8a95ff] transition-colors cursor-col-resize shrink-0' />

					<Panel defaultSize={45} minSize={30} className='h-full min-w-0'>
						<FormatterView
							lang={lang}
							activeEngine={activeEngine}
							activeVersion={currentVersionId}
							configState={currentState}
							onSettingChange={handleSettingChange}
							onResetDefaults={handleResetDefaults}
						/>
					</Panel>

					<PanelResizeHandle className='hidden xl:block w-1 bg-zinc-50 dark:bg-zinc-950 border-x border-zinc-200 dark:border-zinc-900 hover:bg-[#8a95ff] active:bg-[#8a95ff] transition-colors cursor-col-resize shrink-0' />

					<Panel
						defaultSize={35}
						minSize={20}
						collapsible={true}
						className='h-full hidden xl:block min-w-0'
					>
						<CodePreview
							lang={lang}
							activeFile={ENGINES[activeEngine].defaultFileName}
							configState={currentState}
						/>
					</Panel>
				</PanelGroup>
			</div>
			{isModalOpen && (
				<AddConfigModal lang={lang} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
}
