const genSidebar = require('./genSidebar');

module.exports = {
    lang: 'zh-CN',
    title: '教程 | 麦芽糖',
    description: '常用开发工具教程',
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
    themeConfig: {
        logo: '/assets/logo.png',
        navbar: [
            { text: '首页', link: '/' },
            // { text: '教程', link: '/nginx' },
            { text: 'GitHub', link: 'https://github.com/maiyatang/tutorial' },
        ],
        sidebar: genSidebar(),
    },
}
