import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './style/style.css';
import 'element-plus/dist/index.css';
import './style/tailwindCSS.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import socket from './socket/socket';

// Create a Pinia instance
const pinia = createPinia();

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(pinia);
// 在Vue 3 的全局上下文中加入Socket.IO的服務實例
app.config.globalProperties.$socketService = socket;
app.mount('#app');
