<template>
    <ins
    v-if="showAd"
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-3100848271969177"
    data-ad-slot="6164958912"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();
const showAd = ref(false);

const displayAd = async () => {
    // console.log('show ad');
    showAd.value = false;
    await nextTick();
    showAd.value = true;
    await nextTick();

    if (!window.adsbygoogle) {
        window.adsbygoogle = [];
    }
    window.adsbygoogle.push({});
};

router.onAfterRouteChanged = async () => {
    await displayAd();
};

onMounted(() => {
    displayAd();
});
</script>

<style scoped>
.adsbygoogle {
    margin-top: 20px;
}
</style>
