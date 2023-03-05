<template>
    <div class="validator">
        <div class="title">🎫 Content is validated at {{ date }} for</div>
        <div class="os-list">
            <div v-for="os in osList" :key="os">
                ✅ {{ os }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps<{
    osList: string[];
    date: Date;
}>();

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

.validator .os-list {
    display: flex;
}

.validator .os-list > div {
    margin-right: 10px;
}
</style>
