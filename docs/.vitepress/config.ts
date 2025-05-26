import { defineConfig } from 'vitepress';
import genSidebar from './genSidebar';

const DOMAIN = 'https://tutorials.tinkink.net';
const GITHUB = 'https://github.com/tinkink-net/tutorials';

// Navigation interfaces
interface NavTextTranslations {
    en: string;
    'zh-hans': string;
    'zh-hant': string;
    ja: string;
    de: string;
}

interface NavItem {
    text: NavTextTranslations;
    link: string;
    activeMatch?: string;
}

interface NavItemWithChildren {
    text: NavTextTranslations;
    items: NavItem[];
    activeMatch?: string;
}

type RootNavItem = NavItem | NavItemWithChildren;

// Centralized navigation data
const navItems: RootNavItem[] = [
    {
        text: {
            en: 'Tinkink',
            'zh-hans': 'Tinkink',
            'zh-hant': 'Tinkink',
            ja: 'Tinkink',
            de: 'Tinkink'
        },
        link: 'https://tinkink.net',
    },
    {
        text: {
            en: 'Home',
            'zh-hans': '首页',
            'zh-hant': '首頁',
            ja: 'ホーム',
            de: 'Startseite'
        },
        link: '/:lang/'
    },
    {
        text: {
            en: 'Dev Tools',
            'zh-hans': '开发工具',
            'zh-hant': '開發工具',
            ja: '開発ツール',
            de: 'Entwicklungswerkzeuge'
        },
        items: [
            {
                text: {
                    en: 'Git',
                    'zh-hans': 'Git',
                    'zh-hant': 'Git',
                    ja: 'Git',
                    de: 'Git'
                },
                link: '/:lang/git/git-using-different-config-in-different-projects.html',
                activeMatch: '/:lang/git/'
            },
            {
                text: {
                    en: 'VSCode',
                    'zh-hans': 'VSCode',
                    'zh-hant': 'VSCode',
                    ja: 'VSCode',
                    de: 'VSCode'
                },
                link: '/:lang/vscode/copilot-usage-and-shortcut.html',
                activeMatch: '/:lang/vscode/'
            }
        ]
    },
    {
        text: {
            en: 'Databases',
            'zh-hans': '数据库',
            'zh-hant': '資料庫',
            ja: 'データベース',
            de: 'Datenbanken'
        },
        items: [
            {
                text: {
                    en: 'MySQL',
                    'zh-hans': 'MySQL',
                    'zh-hant': 'MySQL',
                    ja: 'MySQL',
                    de: 'MySQL'
                },
                link: '/:lang/mysql/most-used-sql-commands.html',
                activeMatch: '/:lang/mysql/'
            },
            {
                text: {
                    en: 'SQLite',
                    'zh-hans': 'SQLite',
                    'zh-hant': 'SQLite',
                    ja: 'SQLite',
                    de: 'SQLite'
                },
                link: '/:lang/sqlite/deal-with-date-time-type-in-sqlite.html',
                activeMatch: '/:lang/sqlite/'
            }
        ]
    },
    {
        text: {
            en: 'DevOps',
            'zh-hans': 'DevOps',
            'zh-hant': 'DevOps',
            ja: 'DevOps',
            de: 'DevOps'
        },
        items: [
            {
                text: {
                    en: 'Nginx',
                    'zh-hans': 'Nginx',
                    'zh-hant': 'Nginx',
                    ja: 'Nginx',
                    de: 'Nginx'
                },
                link: '/:lang/nginx/nginx-https-config.html',
                activeMatch: '/:lang/nginx/'
            }
        ]
    },
    /* {
        text: {
            en: 'Web & Apps',
            'zh-hans': '网站与应用',
            'zh-hant': '網站與應用',
            ja: 'ウェブ & アプリ',
            de: 'Web & Apps'
        },
        items: []
    }, */
    {
        text: {
            en: 'OS & Tools',
            'zh-hans': '系统与工具',
            'zh-hant': '系統與工具',
            ja: 'オペレーティングシステムとツール',
            de: 'Betriebssysteme & Werkzeuge'
        },
        items: [
            {
                text: {
                    en: 'Linux',
                    'zh-hans': 'Linux',
                    'zh-hant': 'Linux',
                    ja: 'Linux',
                    de: 'Linux'
                },
                link: '/:lang/linux/',
                activeMatch: '/:lang/linux/'
            },
            {
                text: {
                    en: 'Mac',
                    'zh-hans': 'Mac',
                    'zh-hant': 'Mac',
                    ja: 'Mac',
                    de: 'Mac'
                },
                link: '/:lang/mac/how-to-use-docker-on-m1-mac.html',
                activeMatch: '/:lang/mac/'
            },
            {
                text: {
                    en: 'Media',
                    'zh-hans': '媒体',
                    'zh-hant': '媒體',
                    ja: 'メディア',
                    de: 'Medien'
                },
                link: '/:lang/media/convert-compress-video-via-ffmpeg.html',
                activeMatch: '/:lang/media/'
            }
        ]
    },
    /* {
        text: {
            en: 'AI',
            'zh-hans': 'AI',
            'zh-hant': 'AI',
            ja: 'AI',
            de: 'KI'
        },
        items: [
            {
                text: {
                    en: 'ChatAI',
                    'zh-hans': 'ChatAI',
                    'zh-hant': 'ChatAI',
                    ja: 'ChatAI',
                    de: 'ChatAI'
                },
                link: '/:lang/chatgpt/chatgpt-usage.html',
                activeMatch: '/:lang/chatgpt/'
            },
            {
                text: {
                    en: 'AI Coding',
                    'zh-hans': 'AI 编程',
                    'zh-hant': 'AI 編程',
                    ja: 'AI コーディング',
                    de: 'AI-Codierung'
                },
                link: '/:lang/ai-coding/ai-coding-usage.html',
                activeMatch: '/:lang/ai-coding/'
            }
        ]
    } */
];

/**
 * Universal function to translate NavTextTranslations to the target language
 * and replace :lang placeholder in links with the actual language
 * @param item Any object containing NavTextTranslations or strings with :lang placeholder
 * @param lang Target language
 * @returns Processed object with translated text and replaced links
 */
function processTranslations<T extends Object>(item: T, lang: string): any {
    if (!item || typeof item !== 'object') {
        return item;
    }

    // Create a new object to avoid mutating the original
    const processed: any = Array.isArray(item) ? [] : {};

    for (const [key, value] of Object.entries(item)) {
        if (key === 'text' && value && typeof value === 'object' && !Array.isArray(value)) {
            // Handle text translation
            const textTranslations = value as NavTextTranslations;
            processed[key] = textTranslations[lang as keyof NavTextTranslations] || textTranslations['en'];
        } else if (key === 'link' || key === 'activeMatch') {
            // Replace :lang with the actual language
            processed[key] = typeof value === 'string' ? value.replace(':lang', lang) : value;
        } else if (key === 'items' && Array.isArray(value)) {
            // Process array of items
            processed[key] = value.map(subItem => processTranslations(subItem, lang));
        } else if (typeof value === 'object') {
            // Process nested objects recursively
            processed[key] = processTranslations(value, lang);
        } else {
            // Keep other properties as is
            processed[key] = value;
        }
    }

    return processed;
}

// Function to generate navigation for a specific language
function getNav(lang: string) {
    return processTranslations(navItems, lang);
}

export default defineConfig({
    locales: {
        en: {
            label: 'English',
            lang: 'en',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials of common development tools',
            link: '/en/',
            themeConfig: {
                nav: getNav('en'),
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
                nav: getNav('zh-hans'),
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
                nav: getNav('zh-hant'),
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
                nav: getNav('ja'),
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
                nav: getNav('de'),
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
    sitemap: {
        hostname: DOMAIN,
    },
    themeConfig: {
        i18nRouting: true,
        logo: '/assets/logo.png',
        sidebar: genSidebar(),
        socialLinks: [
            { icon: 'github', link: GITHUB },
            { icon: 'twitter', link: 'https://twitter.com/tinkink_net' },
            { icon: 'discord', link: 'https://discord.gg/pVqVKDae' },
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
