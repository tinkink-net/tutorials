import { viteBundler, defaultTheme } from 'vuepress';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import genSidebar from './genSidebar';

module.exports = {
    title: 'Tutorials | Tinkink',
    url: 'https://tutorials.tinkink.net',
    locales: {
        '/en/': {
            lang: 'en',
            title: 'Tutorials | Tinkink',
            description: 'Tutorials of common development tools',
        },
        '/zh-hans/': {
            lang: 'zh-CN',
            title: '教程 | Tinkink',
            description: '常用开发工具教程',
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/assets/logo.png' }],
        // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        // ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    dest: 'public',
    theme: defaultTheme({
        logo: '/assets/logo.png',
        locales: {
            '/zh-hans/': {
                navbar: [
                    { text: '首页', link: '/' },
                    // { text: '教程', link: '/nginx' },
                    // { text: 'GitHub', link: 'https://github.com/maiyatang2021/tutorials' },
                ],
                editLinkText: '协助改进本篇教程',
                selectLanguageName: '简体中文',
                sidebar: genSidebar('zh-hans'),
            },
            '/en/': {
                navbar: [
                    { text: 'Home', link: '/' },
                ],
                editLinkText: 'Help improve this article',
                selectLanguageName: 'English',
                sidebar: genSidebar('en'),
            },
        },
        repo: 'tinkink-co/tutorials',
        repoLabel: 'Github',
        docsBranch: 'master',
        docsDir: 'docs',
        contributors: false,
    }),
    plugins: [
        [googleAnalyticsPlugin({ id: 'G-82JX9NZ3NN' })],
    ],
    bundler: viteBundler(),
}
