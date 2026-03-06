import { browser } from '$app/environment';
import { translations, type Lang } from './translations';

let _lang = $state<Lang>('pt');

export function getLang(): Lang {
	return _lang;
}

export function toggleLang(): void {
	_lang = _lang === 'pt' ? 'en' : 'pt';
	if (browser) localStorage.setItem('lang', _lang);
}

export function initLang(): void {
	if (browser) {
		const stored = localStorage.getItem('lang') as Lang | null;
		if (stored === 'pt' || stored === 'en') _lang = stored;
	}
}

export function t(key: string): string {
	const dict = translations[_lang];
	return (dict as Record<string, string>)[key] ?? (translations.pt as Record<string, string>)[key] ?? key;
}
