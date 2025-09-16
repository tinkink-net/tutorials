<template>
    <Layout>
        <template #aside-outline-after>
            <!-- <AdSense /> -->
            <MyAd />
        </template>
    </Layout>
</template>

<script setup>
import { defineClientComponent } from 'vitepress'
import DefaultTheme from 'vitepress/theme';

const AdSense = defineClientComponent(() => {
    return import('./AdSense.vue');
})

const MyAd = defineClientComponent(() => {
    return import('./MyAd.vue');
})
import { useData } from 'vitepress'
const { Layout } = DefaultTheme;
</script>
