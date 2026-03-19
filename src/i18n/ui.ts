export const languages = {
	en: 'English',
	es: 'Español',
	de: 'Deutsch',
	ja: '日本語',
	ko: '한국어',
};

export const defaultLang: keyof typeof languages = 'en';

export const ui = {
	en: {
		'site.title': 'Astro Template',
		'site.description': 'Astro Template',
		'hero.title': 'Build faster with Astro',
		'hero.subtitle':
			'The web framework for content-driven websites. Now with Vercel and Tailwind v4 support.',
		'features.title': 'Features & Tools',
		'features.subtitle': 'Everything you need to build fast, modern websites.',
		'features.tools.title': 'Modern Stack',
		'features.tools.desc':
			'Astro v5, Tailwind CSS v4, TypeScript, and Biome.js for a blazing fast developer experience.',
		'features.theme.title': 'Theme System',
		'features.theme.desc':
			'Built-in dark and light mode toggle with system preference detection and smooth view transitions.',
		'features.i18n.title': 'Internationalization',
		'features.i18n.desc':
			'Folder-based i18n routing with key-based translations and typesafe URL generation.',
		'features.components.title': 'Primitive Components',
		'features.components.desc':
			'A growing library of unstyled, accessible UI primitives ready for your custom design system.',
		'features.actions.title': 'Declarative Actions',
		'features.actions.desc':
			'A custom, lightweight HTML attribute-based system for executing server actions without writing client JS.',
		'nav.home': 'Home',
		'nav.docs': 'Docs',
		'nav.pricing': 'Pricing',
		'nav.login': 'Login',
		'login.title': 'Login - Astro Template',
		'login.description': 'Login to your account',
		'select.placeholder': 'Select an option',
		'login.heading': 'Welcome Back',
		'login.emailLabel': 'Email Address',
		'login.passwordLabel': 'Password',
		'login.button': 'Sign In',
		'showcase.title': 'Primitives Showcase',
		'showcase.subtitle':
			'A comprehensive collection of 35+ UI primitives designed for consistent, beautiful interfaces.',
		'showcase.core': 'Core Elements',
		'showcase.inputs': 'Inputs & Forms',
		'showcase.controls': 'Controls',
		'showcase.feedback': 'Feedback',
		'showcase.navigation': 'Navigation & Grouping',
		'showcase.complex': 'Complex Blocks',
		'showcase.data': 'Data Display',
		'showcase.code': 'Data & Code',
	},
	es: {
		'site.title': 'Plantilla Astro',
		'site.description': 'Plantilla Astro',
		'hero.title': 'Construye más rápido con Astro',
		'hero.subtitle':
			'El framework web para sitios de contenido. Ahora con soporte para Vercel y Tailwind v4.',
		'features.title': 'Características y Herramientas',
		'features.subtitle':
			'Todo lo que necesitas para construir sitios web modernos y rápidos.',
		'features.tools.title': 'Stack Moderno',
		'features.tools.desc':
			'Astro v5, Tailwind CSS v4, TypeScript y Biome.js para una experiencia de desarrollo ultrarrápida.',
		'features.theme.title': 'Sistema de Temas',
		'features.theme.desc':
			'Modo oscuro y claro integrado con detección de preferencias del sistema y transiciones de vista fluidas.',
		'features.i18n.title': 'Internacionalización',
		'features.i18n.desc':
			'Enrutamiento i18n basado en carpetas con traducciones basadas en claves y generación de URLs con seguridad de tipos.',
		'features.components.title': 'Componentes Primitivos',
		'features.components.desc':
			'Una biblioteca en crecimiento de primitivas de UI sin estilo, accesibles y listas para tu sistema de diseño personalizado.',
		'features.actions.title': 'Acciones Declarativas',
		'features.actions.desc':
			'Un sistema personalizado y ligero basado en atributos HTML para ejecutar acciones del servidor sin escribir JS en el cliente.',
		'nav.home': 'Inicio',
		'nav.docs': 'Documentación',
		'nav.pricing': 'Precios',
		'nav.login': 'Iniciar Sesión',
		'login.title': 'Iniciar Sesión - Plantilla Astro',
		'login.description': 'Inicia sesión en tu cuenta',
		'select.placeholder': 'Seleccione una opción',
		'login.heading': 'Bienvenido de nuevo',
		'login.emailLabel': 'Correo Electrónico',
		'login.passwordLabel': 'Contraseña',
		'login.button': 'Entrar',
		'showcase.title': 'Catálogo de Primitivas',
		'showcase.subtitle':
			'Una colección exhaustiva de más de 35 primitivas de UI diseñadas para interfaces hermosas y consistentes.',
		'showcase.core': 'Elementos Centrales',
		'showcase.inputs': 'Entradas y Formularios',
		'showcase.controls': 'Controles',
		'showcase.feedback': 'Retroalimentación',
		'showcase.navigation': 'Navegación y Agrupación',
		'showcase.complex': 'Bloques Complejos',
		'showcase.data': 'Visualización de Datos',
		'showcase.code': 'Datos y Código',
	},
	de: {
		'site.title': 'Astro Vorlage',
		'site.description': 'Astro Vorlage',
		'hero.title': 'Schneller bauen mit Astro',
		'hero.subtitle':
			'Das Web-Framework für inhaltsgesteuerte Websites. Jetzt mit Vercel- und Tailwind v4-Unterstützung.',
		'features.title': 'Features & Tools',
		'features.subtitle': 'Everything you need to build fast, modern websites.',
		'features.tools.title': 'Modern Stack',
		'features.tools.desc':
			'Astro v5, Tailwind CSS v4, TypeScript, and Biome.js for a blazing fast developer experience.',
		'features.theme.title': 'Theme System',
		'features.theme.desc':
			'Built-in dark and light mode toggle with system preference detection and smooth view transitions.',
		'features.i18n.title': 'Internationalization',
		'features.i18n.desc':
			'Folder-based i18n routing with key-based translations and typesafe URL generation.',
		'features.components.title': 'Primitive Components',
		'features.components.desc':
			'A growing library of unstyled, accessible UI primitives ready for your custom design system.',
		'features.actions.title': 'Declarative Actions',
		'features.actions.desc':
			'A custom, lightweight HTML attribute-based system for executing server actions without writing client JS.',
		'nav.home': 'Startseite',
		'nav.docs': 'Dokumentation',
		'nav.pricing': 'Preise',
		'nav.login': 'Anmelden',
		'login.title': 'Anmelden - Astro Vorlage',
		'login.description': 'Melden Sie sich an',
		'select.placeholder': 'Wählen Sie eine Option',
		'login.heading': 'Willkommen zurück',
		'login.emailLabel': 'E-Mail Adresse',
		'login.passwordLabel': 'Passwort',
		'login.button': 'Einloggen',
		'showcase.title': 'Primitives Showcase',
		'showcase.subtitle':
			'A comprehensive collection of 35+ UI primitives designed for consistent, beautiful interfaces.',
		'showcase.core': 'Core Elements',
		'showcase.inputs': 'Inputs & Forms',
		'showcase.controls': 'Controls',
		'showcase.feedback': 'Feedback',
		'showcase.navigation': 'Navigation & Grouping',
		'showcase.complex': 'Complex Blocks',
		'showcase.data': 'Data Display',
		'showcase.code': 'Data & Code',
	},
	ja: {
		'site.title': 'Astro テンプレート',
		'site.description': 'Astro テンプレート',
		'hero.title': 'Astroでより速く構築',
		'hero.subtitle':
			'コンテンツ駆動型ウェブサイト向けのウェブフレームワーク。VercelとTailwind v4をサポート。',
		'features.title': 'Features & Tools',
		'features.subtitle': 'Everything you need to build fast, modern websites.',
		'features.tools.title': 'Modern Stack',
		'features.tools.desc':
			'Astro v5, Tailwind CSS v4, TypeScript, and Biome.js for a blazing fast developer experience.',
		'features.theme.title': 'Theme System',
		'features.theme.desc':
			'Built-in dark and light mode toggle with system preference detection and smooth view transitions.',
		'features.i18n.title': 'Internationalization',
		'features.i18n.desc':
			'Folder-based i18n routing with key-based translations and typesafe URL generation.',
		'features.components.title': 'Primitive Components',
		'features.components.desc':
			'A growing library of unstyled, accessible UI primitives ready for your custom design system.',
		'features.actions.title': 'Declarative Actions',
		'features.actions.desc':
			'A custom, lightweight HTML attribute-based system for executing server actions without writing client JS.',
		'nav.home': 'ホーム',
		'nav.docs': 'ドキュメント',
		'nav.pricing': '価格',
		'nav.login': 'ログイン',
		'login.title': 'ログイン - Astro テンプレート',
		'login.description': 'アカウントにログインする',
		'select.placeholder': 'オプションを選択してください',
		'login.heading': 'お帰りなさい',
		'login.emailLabel': 'メールアドレス',
		'login.passwordLabel': 'パスワード',
		'login.button': 'サインイン',
		'showcase.title': 'Primitives Showcase',
		'showcase.subtitle':
			'A comprehensive collection of 35+ UI primitives designed for consistent, beautiful interfaces.',
		'showcase.core': 'Core Elements',
		'showcase.inputs': 'Inputs & Forms',
		'showcase.controls': 'Controls',
		'showcase.feedback': 'Feedback',
		'showcase.navigation': 'Navigation & Grouping',
		'showcase.complex': 'Complex Blocks',
		'showcase.data': 'Data Display',
		'showcase.code': 'Data & Code',
	},
	ko: {
		'site.title': 'Astro 템플릿',
		'site.description': 'Astro 템플릿',
		'hero.title': 'Astro로 더 빠르게 구축하세요',
		'hero.subtitle':
			'콘텐츠 중심 웹사이트를 위한 웹 프레임워크. 이제 Vercel 및 Tailwind v4를 지원합니다.',
		'features.title': 'Features & Tools',
		'features.subtitle': 'Everything you need to build fast, modern websites.',
		'features.tools.title': 'Modern Stack',
		'features.tools.desc':
			'Astro v5, Tailwind CSS v4, TypeScript, and Biome.js for a blazing fast developer experience.',
		'features.theme.title': 'Theme System',
		'features.theme.desc':
			'Built-in dark and light mode toggle with system preference detection and smooth view transitions.',
		'features.i18n.title': 'Internationalization',
		'features.i18n.desc':
			'Folder-based i18n routing with key-based translations and typesafe URL generation.',
		'features.components.title': 'Primitive Components',
		'features.components.desc':
			'A growing library of unstyled, accessible UI primitives ready for your custom design system.',
		'features.actions.title': 'Declarative Actions',
		'features.actions.desc':
			'A custom, lightweight HTML attribute-based system for executing server actions without writing client JS.',
		'nav.home': '홈',
		'nav.docs': '문서',
		'nav.pricing': '가격',
		'nav.login': '로그인',
		'login.title': '로그인 - Astro 템플릿',
		'login.description': '계정에 로그인하세요',
		'select.placeholder': '옵션을 선택하세요',
		'login.heading': '다시 오신 것을 환영합니다',
		'login.emailLabel': '이메일 주소',
		'login.passwordLabel': '비밀번호',
		'login.button': '로그인',
		'showcase.title': 'Primitives Showcase',
		'showcase.subtitle':
			'A comprehensive collection of 35+ UI primitives designed for consistent, beautiful interfaces.',
		'showcase.core': 'Core Elements',
		'showcase.inputs': 'Inputs & Forms',
		'showcase.controls': 'Controls',
		'showcase.feedback': 'Feedback',
		'showcase.navigation': 'Navigation & Grouping',
		'showcase.complex': 'Complex Blocks',
		'showcase.data': 'Data Display',
		'showcase.code': 'Data & Code',
	},
} as const;
