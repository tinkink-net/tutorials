import { defineClientConfig } from '@vuepress/client'
import HomeLayout from './components/HomeLayout.vue'
import Validator from './components/Validator.vue'

export default defineClientConfig({
    enhance({ app }) {
        app.component('HomeLayout', HomeLayout)
        app.component('Validator', Validator)
    },
})
