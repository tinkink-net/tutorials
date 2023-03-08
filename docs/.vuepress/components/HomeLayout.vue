<template>
redirecting...
</template>

<script lang="ts">
const getLanguage = (supportedLangs: string[]): string => {
    let uaLangs = navigator.languages.slice();
    if (!uaLangs) uaLangs = [navigator.language];

    // add alias to uaLangs (for example zh-cn -> zh-hans for chinese)
    const aliasMap = {
        'zh-cn': 'zh-hans',
        'zh-tw': 'zh-hant',
        'zh-hk': 'zh-hant',
        'ja': 'jp',
        'ja-jp': 'jp',
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
    location.replace(`/${lang}/`);
};

if (typeof window !== 'undefined' && location.pathname === '/') {
    const supportedLangs = ['en', 'zh-hans', 'zh-hant', 'jp'];
    const lang = getLanguage(supportedLangs);
    redirectTo(lang);
}
</script>
