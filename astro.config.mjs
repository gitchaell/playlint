// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';
import astroTypesafeRoutes from 'astro-typesafe-routes';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://playlint.vercel.app',
    integrations: [astroTypesafeRoutes(), sitemap({
        i18n: {
            defaultLocale: 'en',
            locales: {
                en: 'en-US',
                es: 'es-ES',
                de: 'de-DE',
                ja: 'ja-JP',
                ko: 'ko-KR',
            },
        },
		}), AstroPWA({
        mode: 'development',
        base: '/',
        scope: '/',
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        manifest: {
            name: 'PlayLint Configuration',
            short_name: 'PlayLint',
            description: 'Professional Linter Configuration tool for Biome, Prettier, ESLint and more.',
            theme_color: '#09090b',
            background_color: '#09090b',
            display: 'standalone'
        },
        pwaAssets: {
            config: true,
        },
        workbox: {
            navigateFallback: '/404',
            globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        },
        devOptions: {
            enabled: false,
            navigateFallbackAllowlist: [/^\//],
        },
        experimental: {
            directoryAndTrailingSlashHandler: true,
        },
		}), react()],

    vite: {
        plugins: [tailwindcss()],
    },

    i18n: {
        locales: ['en', 'es', 'de', 'ja', 'ko'],
        defaultLocale: 'en',
        fallback: {
            es: 'en',
            de: 'en',
            ja: 'en',
            ko: 'en',
        },
        routing: 'manual',
    },
});