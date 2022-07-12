const { viteBundler, defaultTheme } = require('vuepress');
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics');
const genSidebar = require('./genSidebar');

module.exports = {
    locales: {
        '/zh-hans/': {
            lang: 'zh-CN',
            title: '教程 | Tinkink',
            description: '常用开发工具教程',
        },
        '/en/': {
            lang: 'en',
            title: 'Tutorial | Tinkink',
            description: 'Tutorials of common development tools',
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
            },
            '/en/': {
                navbar: [
                    { text: 'Home', link: '/' },
                ],
                editLinkText: 'Help improve this article',
            },
        },
        sidebar: genSidebar(),
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
