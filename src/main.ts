import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './style/style.css';
import 'element-plus/dist/index.css';
import './style/tailwindCSS.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faArrowsDownToLine, faArrowsTurnRight, faUserPlus, faUserXmark, faChair, faUpload,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

/* add icons to the library */
library.add(faArrowsDownToLine, faArrowsTurnRight, faUserPlus, faUserXmark, faChair, faUpload);

// Create a Pinia instance
const pinia = createPinia();

const app = createApp(App);

Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component);
});

app.use(ElementPlus);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
