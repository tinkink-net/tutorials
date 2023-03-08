<template>
    <div class="validator">
        <div class="title">{{ textFunc(date) }}</div>
        <div class="platform-list">
            <div v-for="platform in platformList" :key="platform">
                ✅ {{ platform }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const textMap = {
    'en': (date) => `🎫 Content is validated at ${date} for`,
    'zh-hans': (date) => `🎫 教程内容于 ${date} 在以下平台验证通过`,
    'zh-hant': (date) => `🎫 教程内容于 ${date} 在以下平台驗證通過`,
};

const props = defineProps<{
    platformList: string[];
    date: Date;
    lang: string;
}>();

const textFunc = textMap[props.lang || 'en'];

</script>

<style scoped>
.validator {
    padding: 20px;
    /* light green */
    background-color: var(--c-bg-light);
    border: 1px solid var(--c-border);
    border-radius: 5px;
    color: var(--c-text);
    font-weight: bold;
    font-size: 14px;
}

.validator .title {
    font-size: 16px;
    margin-bottom: 10px;
}

.validator .platform-list {
    display: flex;
}

.validator .platform-list > div {
    margin-right: 10px;
}
</style>
