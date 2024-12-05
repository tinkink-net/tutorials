import { defineConfig } from 'vitepress';
import genSidebar from './genSidebar';

const DOMAIN = 'https://tutorials.tinkink.net';
const GITHUB = 'https://github.com/tinkink-net/tutorials';

export default defineConfig({
    locales: {
        en: {
            label: 'English',
            lang: 'en',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials of common development tools',
            link: '/en/',
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: 'Home', link: '/en/' },
                    { text: 'Linux', link: '/en/linux/', activeMatch: '/en/linux/' },
                    { text: 'Mac', link: '/en/mac/how-to-use-docker-on-m1-mac.html', activeMatch: '/en/mac/' },
                    { text: 'Git', link: '/en/git/git-using-different-config-in-different-projects.html', activeMatch: '/en/git/' },
                    { text: 'MySQL', link: '/en/mysql/most-used-sql-commands.html', activeMatch: '/en/mysql/' },
                    { text: 'SQLite', link: '/en/sqlite/deal-with-date-time-type-in-sqlite.html', activeMatch: '/en/sqlite/' },
                    { text: 'Nginx', link: '/en/nginx/nginx-https-config.html', activeMatch: '/en/nginx/' },
                    { text: 'VSCode', link: '/en/vscode/copilot-usage-and-shortcut.html', activeMatch: '/en/vscode/' },
                    { text: 'Media', link: '/en/media/convert-compress-video-via-ffmpeg.html', activeMatch: '/en/media/' },
                ],
                editLink: {
                    text: 'Help improve this page',
                    pattern: GITHUB + '/edit/master/docs/:path',
                },
            }
        },
        'zh-hans': {
            label: '简体中文',
            lang: 'zh-Hans',
            title: '教程 | Tinkink',
            description: '常用开发工具教程',
            link: '/zh-hans/',
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: '首页', link: '/zh-hans/' },
                    { text: 'Linux', link: '/zh-hans/linux/', activeMatch: '/zh-hans/linux/' },
                    { text: 'Mac', link: '/zh-hans/mac/how-to-use-docker-on-m1-mac.html', activeMatch: '/zh-hans/mac/' },
                    { text: 'Git', link: '/zh-hans/git/git-using-different-config-in-different-projects.html', activeMatch: '/zh-hans/git/' },
                    { text: 'MySQL', link: '/zh-hans/mysql/most-used-sql-commands.html', activeMatch: '/zh-hans/mysql/' },
                    { text: 'SQLite', link: '/zh-hans/sqlite/deal-with-date-time-type-in-sqlite.html', activeMatch: '/zh-hans/sqlite/' },
                    { text: 'Nginx', link: '/zh-hans/nginx/nginx-https-config.html', activeMatch: '/zh-hans/nginx/' },
                    { text: 'VSCode', link: '/zh-hans/vscode/copilot-usage-and-shortcut.html', activeMatch: '/zh-hans/vscode/' },
                    { text: '媒体', link: '/zh-hans/media/convert-compress-video-via-ffmpeg.html', activeMatch: '/zh-hans/media/' },
                ],
                editLink: {
                    text: '协助改进本页面',
                    pattern: GITHUB + '/edit/master/docs/:path',
                },
            },
        },
        'zh-hant': {
            label: '繁體中文',
            lang: 'zh-Hant',
            title: '教程 | Tinkink',
            description: '常用開發工具教程',
            link: '/zh-hant/',
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: '首頁', link: '/zh-hant/' },
                    { text: 'Linux', link: '/zh-hant/linux/', activeMatch: '/zh-hant/linux/' },
                    { text: 'Mac', link: '/zh-hant/mac/how-to-use-docker-on-m1-mac.html', activeMatch: '/zh-hant/mac/' },
                    { text: 'Git', link: '/zh-hant/git/git-using-different-config-in-different-projects.html', activeMatch: '/zh-hant/git/' },
                    { text: 'MySQL', link: '/zh-hant/mysql/most-used-sql-commands.html', activeMatch: '/zh-hant/mysql/' },
                    { text: 'SQLite', link: '/zh-hant/sqlite/deal-with-date-time-type-in-sqlite.html', activeMatch: '/zh-hant/sqlite/' },
                    { text: 'Nginx', link: '/zh-hant/nginx/nginx-https-config.html', activeMatch: '/zh-hant/nginx/' },
                    { text: 'VSCode', link: '/zh-hant/vscode/copilot-usage-and-shortcut.html', activeMatch: '/zh-hant/vscode/' },
                    { text: '媒體', link: '/zh-hant/media/convert-compress-video-via-ffmpeg.html', activeMatch: '/zh-hant/media/' },
                ],
                editLink: {
                    text: '協助改進本頁面',
                    pattern: GITHUB + '/edit/master/docs/:path',
                },
            },
        },
        ja: {
            label: '日本語',
            lang: 'ja',
            title: 'チュートリアル | Tinkink',
            description: 'よく使う開発ツールのチュートリアル',
            link: '/ja/',
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: 'ホーム', link: '/ja/' },
                    { text: 'Linux', link: '/ja/linux/', activeMatch: '/ja/linux/' },
                    { text: 'Mac', link: '/ja/mac/how-to-use-docker-on-m1-mac.html', activeMatch: '/ja/mac/' },
                    { text: 'Git', link: '/ja/git/git-using-different-config-in-different-projects.html', activeMatch: '/ja/git/' },
                    { text: 'MySQL', link: '/ja/mysql/most-used-sql-commands.html', activeMatch: '/ja/mysql/' },
                    { text: 'SQLite', link: '/ja/sqlite/deal-with-date-time-type-in-sqlite.html', activeMatch: '/ja/sqlite/' },
                    { text: 'Nginx', link: '/ja/nginx/nginx-https-config.html', activeMatch: '/ja/nginx/' },
                    { text: 'VSCode', link: '/ja/vscode/copilot-usage-and-shortcut.html', activeMatch: '/ja/vscode/' },
                    { text: 'メディア', link: '/ja/media/convert-compress-video-via-ffmpeg.html', activeMatch: '/ja/media/' },
                ],
                editLink: {
                    text: 'このページを改善するのを手伝ってください',
                    pattern: GITHUB + '/edit/master/docs/:path',
                },
            }
        },
        de: {
            label: 'Deutsch',
            lang: 'de',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials von gängigen Entwicklungstools',
            link: '/de/',
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: 'Startseite', link: '/de/' },
                    { text: 'Linux', link: '/de/linux/', activeMatch: '/de/linux/' },
                    { text: 'Mac', link: '/de/mac/how-to-use-docker-on-m1-mac.html', activeMatch: '/de/mac/' },
                    { text: 'Git', link: '/de/git/git-using-different-config-in-different-projects.html', activeMatch: '/de/git/' },
                    { text: 'MySQL', link: '/de/mysql/most-used-sql-commands.html', activeMatch: '/de/mysql/' },
                    { text: 'SQLite', link: '/de/sqlite/deal-with-date-time-type-in-sqlite.html', activeMatch: '/de/sqlite/' },
                    { text: 'Nginx', link: '/de/nginx/nginx-https-config.html', activeMatch: '/de/nginx/' },
                    { text: 'VSCode', link: '/de/vscode/copilot-usage-and-shortcut.html', activeMatch: '/de/vscode/' },
                    { text: 'Medien', link: '/de/media/convert-compress-video-via-ffmpeg.html', activeMatch: '/de/media/' },
                ],
                editLink: {
                    text: 'Helfen Sie, diese Seite zu verbessern',
                    pattern: GITHUB + '/edit/master/docs/:path',
                },
            }
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/assets/logo.png' }],
        ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-82JX9NZ3NN' }],
        ['script', {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-82JX9NZ3NN');`],
        ['script', { async: '', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3100848271969177', crossorigin: 'anonymous' }],
    ],
    outDir: '../dist',
    lastUpdated: true,
    themeConfig: {
        i18nRouting: true,
        logo: '/assets/logo.png',
        sidebar: genSidebar(),
        socialLinks: [
            { icon: 'github', link: GITHUB },
            { icon: 'twitter', link: 'https://twitter.com/tinkink_net' },
        ]
    },
    transformHead(context) {
        // add link alternate for i18n
        const pageLang = context.pageData.relativePath.split('/')[0];
        if (!pageLang || pageLang === 'index.md') return;
        const pageLangReg = new RegExp('^' + pageLang + '/');

        return ['en', 'zh-Hans', 'zh-Hant', 'ja', 'de', 'x-default'].map((lang) => {

            let altPathLang = lang.toLowerCase();
            if (lang === 'x-default') {
                altPathLang = 'en';
            }
            const altPath = context.pageData.relativePath.replace(pageLangReg, altPathLang + '/').replace(/\.md$/, '.html').replace(/\/index.html$/, '/');
            return ['link', {
                    rel: 'alternate',
                    hreflang: lang,
                    href: DOMAIN + '/' + altPath,
                }
            ];
        });
    },
    rewrites: {
        // no chapter folder
        ':lang/:topic/(\\d+[.-]):article': ':lang/:topic/:article',
        // chapter folder & ordered articles
        ':lang/:topic/:chapter/(\\d+[.-]):article': ':lang/:topic/:article',
        // chapter folder & unordered articles
        ':lang/:topic/:chapter/:article': ':lang/:topic/:article',
    },
});
