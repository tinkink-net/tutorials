import { defineClientConfig } from '@vuepress/client'
import HomeLayout from './components/HomeLayout.vue'

export default defineClientConfig({
    enhance({ app }) {
        app.component('HomeLayout', HomeLayout)
    },
})
