import { defaultLang, ui } from './ui';

export type LangCode = keyof typeof ui;

export function useTranslations(lang: LangCode) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang]?.[key] || ui[defaultLang][key];
	};
}
