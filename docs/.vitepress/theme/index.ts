import DefaultTheme from 'vitepress/theme';
import MyLayout from '../components/MyLayout.vue';
import Validator from '../components/Validator.vue';

export default {
    ...DefaultTheme,
    Layout: MyLayout,
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Validator', Validator);
    }
}
