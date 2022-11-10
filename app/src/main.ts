import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import piniaReset from './util/pinia-plugins/store-reset'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)
pinia.use(piniaReset)

createApp(App)
    .use(pinia)
    .mount("#app")
