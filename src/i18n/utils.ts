import { defaultLang, ui } from './ui';

export type LangCode = keyof typeof ui;
export type UiKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: LangCode | string) {
	const validLang = (lang in ui ? lang : defaultLang) as LangCode;
	return function t(key: UiKey): string {
		return ui[validLang]?.[key] || ui[defaultLang][key];
	};
}
