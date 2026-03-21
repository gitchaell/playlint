import { Editor } from '@monaco-editor/react';
import {
	AlignLeft,
	CheckCircle2,
	Clock,
	Code2,
	Copy,
	Download,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from '../../i18n/utils';

interface CodePreviewProps {
	lang: string;
	configState: any;
	activeFile: string;
}

export function CodePreview({
	lang,
	configState,
	activeFile,
}: CodePreviewProps) {
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

	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark');
		setIsDark(isDarkMode);

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.attributeName === 'class') {
					setIsDark(document.documentElement.classList.contains('dark'));
				}
			}
		});

		observer.observe(document.documentElement, { attributes: true });
		return () => observer.disconnect();
	}, []);

	return (
		<section
			className='w-full h-full bg-[#1e1e1e] flex flex-col font-mono text-[#d4d4d4]'
			style={{ fontFamily: 'var(--font-mono)' }}
		>
			<div className='h-14 border-b border-[#2d2d2d] flex items-center justify-between px-6 bg-[#1e1e1e] shrink-0'>
				<div className='flex items-center gap-2 truncate pr-4 opacity-80'>
					<Code2 className='w-4 h-4 text-[#8a95ff] shrink-0' />
					<span className='text-xs font-medium text-white tracking-wide truncate'>
						{activeFile}
					</span>
				</div>
				<div className='flex gap-4 shrink-0'>
					<button
						type='button'
						onClick={() =>
							navigator.clipboard.writeText(
								JSON.stringify(configState, null, 2),
							)
						}
						className='text-[#858585] hover:text-white transition-colors'
						title='Copy'
					>
						<Copy className='w-4 h-4' />
					</button>
					<button
						type='button'
						onClick={handleFormat}
						className='text-[#858585] hover:text-white transition-colors'
						title='Format'
					>
						<AlignLeft className='w-4 h-4' />
					</button>
					<button
						type='button'
						onClick={handleDownload}
						className='text-[#8a95ff] hover:text-[#7681ff] transition-colors'
						title='Download'
					>
						<Download className='w-4 h-4' />
					</button>
				</div>
			</div>

			<div className='flex-1 py-6 text-[13px] leading-relaxed overflow-y-auto bg-[#1e1e1e]'>
				<Editor
					height='100%'
					language='json'
					theme='vs-dark'
					value={JSON.stringify(configState, null, 2)}
					options={{
						readOnly: true,
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						fontFamily: 'var(--font-mono, "Geist Mono", monospace)',
						fontSize: 13,
						lineHeight: 22,
						padding: { top: 16, bottom: 16 },
					}}
				/>
			</div>

			<div className='px-4 py-1.5 bg-[#007acc] text-white text-[11px] shrink-0 flex items-center justify-between tracking-wide'>
				<div className='flex items-center gap-4'>
					<span className='flex items-center gap-1.5 font-medium'>
						<CheckCircle2 className='w-3.5 h-3.5' />{' '}
						<span className='hidden sm:inline'>{t('linter.validSchema')}</span>
					</span>
					<span className='flex items-center gap-1.5 hidden sm:flex opacity-90'>
						<Clock className='w-3.5 h-3.5' /> {t('linter.sync')}
					</span>
				</div>
				<span className='uppercase opacity-90'>UTF-8</span>
			</div>
		</section>
	);
}
