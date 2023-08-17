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
            themeConfig: {
                nav: [
                    { text: 'Tinkink', link: 'https://tinkink.net' },
                    { text: 'Home', link: '/en/' },
                    { text: 'Linux', link: '/en/linux/' },
                    { text: 'Mac', link: '/en/mac/how-to-use-docker-on-m1-mac.html' },
                    { text: 'Git', link: '/en/git/git-using-different-config-in-different-projects.html' },
                    { text: 'Mysql', link: '/en/mysql/most-used-sql-commands.html' },
                    { text: 'Nginx', link: '/en/nginx/nginx-https-config.html' },
                    { text: 'Vscode', link: '/en/vscode/copilot-usage-and-shortcut.html' },
                    { text: 'Media', link: '/en/media/convert-compress-video-via-ffmpeg.html' },
                ],
                editLink: {
                    text: 'Help improve this page',
                    pattern: 'https://github.com/tinkink-net/tutorials/edit/master/docs/:path',
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
                    { text: 'Linux', link: '/zh-hans/linux/' },
                    { text: 'Mac', link: '/zh-hans/mac/how-to-use-docker-on-m1-mac.html' },
                    { text: 'Git', link: '/zh-hans/git/git-using-different-config-in-different-projects.html' },
                    { text: 'Mysql', link: '/zh-hans/mysql/most-used-sql-commands.html' },
                    { text: 'Nginx', link: '/zh-hans/nginx/nginx-https-config.html' },
                    { text: 'Vscode', link: '/zh-hans/vscode/copilot-usage-and-shortcut.html' },
                    { text: '媒体', link: '/zh-hans/media/convert-compress-video-via-ffmpeg.html' },
                ],
                editLink: {
                    text: '协助改进本页面',
                    pattern: 'https://github.com/tinkink-net/tutorials/edit/master/docs/:path',
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
                    { text: 'Linux', link: '/zh-hant/linux/' },
                    { text: 'Mac', link: '/zh-hant/mac/how-to-use-docker-on-m1-mac.html' },
                    { text: 'Git', link: '/zh-hant/git/git-using-different-config-in-different-projects.html' },
                    { text: 'Mysql', link: '/zh-hant/mysql/most-used-sql-commands.html' },
                    { text: 'Nginx', link: '/zh-hant/nginx/nginx-https-config.html' },
                    { text: 'Vscode', link: '/zh-hant/vscode/copilot-usage-and-shortcut.html' },
                    { text: '媒體', link: '/zh-hant/media/convert-compress-video-via-ffmpeg.html' }
                ],
                editLink: {
                    text: '協助改進本頁面',
                    pattern: 'https://github.com/tinkink-net/tutorials/edit/master/docs/:path',
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
                    { text: 'Linux', link: '/ja/linux/' },
                    { text: 'Mac', link: '/ja/mac/how-to-use-docker-on-m1-mac.html' },
                    { text: 'Git', link: '/ja/git/git-using-different-config-in-different-projects.html' },
                    { text: 'Mysql', link: '/ja/mysql/most-used-sql-commands.html' },
                    { text: 'Nginx', link: '/ja/nginx/nginx-https-config.html' },
                    { text: 'Vscode', link: '/ja/vscode/copilot-usage-and-shortcut.html' },
                    { text: 'メディア', link: '/ja/media/convert-compress-video-via-ffmpeg.html' }
                ],
                editLink: {
                    text: 'このページを改善するのを手伝ってください',
                    pattern: 'https://github.com/tinkink-net/tutorials/edit/master/docs/:path',
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
                    { text: 'Linux', link: '/de/linux/' },
                    { text: 'Mac', link: '/de/mac/how-to-use-docker-on-m1-mac.html' },
                    { text: 'Git', link: '/de/git/git-using-different-config-in-different-projects.html' },
                    { text: 'Mysql', link: '/de/mysql/most-used-sql-commands.html' },
                    { text: 'Nginx', link: '/de/nginx/nginx-https-config.html' },
                    { text: 'Vscode', link: '/de/vscode/copilot-usage-and-shortcut.html' },
                    { text: 'Medien', link: '/de/media/convert-compress-video-via-ffmpeg.html' }
                ],
                editLink: {
                    text: 'Helfen Sie, diese Seite zu verbessern',
                    pattern: 'https://github.com/tinkink-net/tutorials/edit/master/docs/:path',
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
            { icon: 'github', link: 'https://github.com/tinkink-net/tutorials' },
            { icon: 'twitter', link: 'https://twitter.com/tinkink_net' },
        ]
    },
    transformHead(context) {
        // add link alternate for i18n
        return ['en', 'zh-hans', 'zh-hant', 'ja', 'de'].map((lang) => {
            const pageLang = context.pageData.relativePath.split('/')[0];
            // if (lang === pageLang) return;
            return ['link', {
                    rel: 'alternate',
                    hreflang: lang,
                    href: `https://tutorials.tinkink.net/${lang}${context.pageData.relativePath.replace('/' + pageLang + '/', '/' + lang + '/')}`
                }
            ];
        });
    },
});
