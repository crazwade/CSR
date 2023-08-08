import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './style/style.css';
import 'element-plus/dist/index.css';
import './style/tailwindCSS.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
// Create a Pinia instance
const pinia = createPinia();

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
