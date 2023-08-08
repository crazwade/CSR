import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './style.css';
import 'element-plus/dist/index.css';
import App from './App.vue';
// Create a Pinia instance
const pinia = createPinia();

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
