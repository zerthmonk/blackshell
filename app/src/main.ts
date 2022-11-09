import { createApp } from 'vue'
<<<<<<< HEAD
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App)
    .use(pinia)
=======
import App from './App.vue'

createApp(App)
>>>>>>> main
    .mount("#app")
