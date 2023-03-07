<template>
    <header class="navbar fixed z-20 top-0 left-0 right-0 h-14 border-b border-gray-100 px-6 py-3">
        <div class="toggle-sidebar-button" title="toggle sidebar" aria-expanded="false" role="button" tabindex="0">
            <div class="icon" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
        <span>
            <a aria-current="page" href="/zh-hans/" class="router-link-active router-link-exact-active">
                <img class="logo inline h-8 mr-3" src="/images/logo.png" alt="教程 | Tinkink">
                <span class="site-name can-hide text-xl font-bold text-slate-800">教程 | Tinkink</span>
            </a>
        </span>
        <div class="navbar-items-wrapper flex absolute top-3 right-6 bottom-3 pl-6 whitespace-nowrap text-base" style="max-width: 1463px;"><!--[--><!--]-->
            <nav class="navbar-items can-hide"><!--[-->
                <div class="navbar-item inline-block ml-6" v-for="menu in menus" :key="menu.title">
                    <a :href="menu.link" class="router-link-active" :aria-label="menu.title">{{ menu.title }}</a>
                </div>
                <!-- <div class="navbar-item inline-block ml-6">
                    <div class="navbar-dropdown-wrapper">
                        <button class="navbar-dropdown-title" type="button" aria-label="Select language">
                            <span class="title">Languages</span>
                            <span class="arrow down"></span>
                        </button>
                        <button class="navbar-dropdown-title-mobile" type="button" aria-label="Select language">
                            <span class="title">Languages</span>
                            <span class="right arrow"></span>
                        </button>
                        <ul style="display:none;" class="navbar-dropdown">
                            <li class="navbar-dropdown-item"><a href="/en/" class="" aria-label="English">English</a></li>
                            <li class="navbar-dropdown-item"><a aria-current="page" href="/zh-hans/" class="router-link-active router-link-exact-active" aria-label="简体中文">简体中文</a></li>
                        </ul>
                    </div>
                </div>
                <div class="navbar-item">
                    <a class="external-link" href="https://github.com/tinkink-co/tutorials" rel="noopener noreferrer" target="_blank" aria-label="Github">Github</a>
                </div>-->
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
const menus = [
    {
        title: '首页',
        link: '/',
    },
    {
        title: 'Languages',
        link: '',
        children: [
            {
                title: 'English',
                link: '/en/',
            },
            {
                title: '简体中文',
                link: '/zh-hans/',
            },
        ],
    },
    {
        title: 'Github',
        link: 'https://github.com',
    },
];
</script>
