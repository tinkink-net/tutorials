---
layout: false
title: Home
---

Redirecting...

- [English](/en/)
- [简体中文](/zh-hans/)
- [繁體中文](/zh-hant/)
- [日本語](/ja/)
- [Deutsch](/de/)

<script setup lang="ts">
const getLanguage = (supportedLangs: string[]): string => {
    let uaLangs = navigator.languages.slice();
    if (!uaLangs) uaLangs = [navigator.language];

    // add alias to uaLangs (for example zh-cn -> zh-hans for chinese)
    const aliasMap = {
        'zh-cn': 'zh-hans',
        'zh-tw': 'zh-hant',
        'zh-hk': 'zh-hant',
        'jp': 'ja',
        'ja-jp': 'ja',
        'de-de': 'de',
    };
    for (let i = uaLangs.length; i--;) {
        const lang = uaLangs[i];
        const alias = aliasMap[lang.toLocaleLowerCase()];
        if (alias) uaLangs.splice(i, 0, alias);
    }

    let ret = supportedLangs[0];
    for (let i = 0; i < uaLangs.length; i++) {
        const lang = uaLangs[i].toLocaleLowerCase();
        if (supportedLangs.indexOf(lang) > -1) {
            ret = lang;
            break;
        }
    }

    return ret;
};

const redirectTo = (lang: string): void => {
    // console.log('redirect to ' + lang);
    location.replace(`/${lang}/`);
};

if (typeof window !== 'undefined' && location.pathname === '/') {
    const supportedLangs = ['en', 'zh-hans', 'zh-hant', 'ja', 'de'];
    const lang = getLanguage(supportedLangs);
    redirectTo(lang);
}
</script>
