<template>
    <Layout>
        <template #aside-outline-after>
            <AdSense />
        </template>
    </Layout>
</template>

<script setup>
import { defineClientComponent } from 'vitepress'
import DefaultTheme from 'vitepress/theme';

const AdSense = defineClientComponent(() => {
    return import('./AdSense.vue');
})


const { Layout } = DefaultTheme;
</script>
