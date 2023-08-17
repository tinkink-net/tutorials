import DefaultTheme from 'vitepress/theme';
import Validator from '../components/Validator.vue';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Validator', Validator);
    }
}
