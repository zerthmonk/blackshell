import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from '@/store'
import App from './App.vue'


createApp(App)
    .use(createPinia())
    .mount("#app")
