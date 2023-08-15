import { defineConfig } from 'vitepress';
import genSidebar from './genSidebar';

export default defineConfig({
    locales: {
        en: {
            label: 'English',
            lang: 'en',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials of common development tools',
            link: '/en/',
        },
        'zh-hans': {
            label: '简体中文',
            lang: 'zh-Hans',
            title: '教程 | Tinkink',
            description: '常用开发工具教程',
            link: '/zh-hans/',
        },
        'zh-hant': {
            label: '繁體中文',
            lang: 'zh-Hant',
            title: '教程 | Tinkink',
            description: '常用開發工具教程',
            link: '/zh-hant/',
        },
        ja: {
            label: '日本語',
            lang: 'ja',
            title: 'チュートリアル | Tinkink',
            description: 'よく使う開発ツールのチュートリアル',
            link: '/ja/',
        },
        de: {
            label: 'Deutsch',
            lang: 'de',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials von gängigen Entwicklungstools',
            link: '/de/',
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/assets/logo.png' }],
        ['script', { async: '', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3100848271969177', crossorigin: 'anonymous' }],
    ],
    outDir: 'public',

    themeConfig: {
        sidebar: genSidebar(),
    },
});
