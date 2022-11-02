import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import firebaseApp from '../config/firebase.config';

// const pinia = createPinia()
// pinia.use(piniaPersist)

// const bubbleSort = (arr) => {
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = 0; j < (arr.length - i - 1); j++) {
//             if (arr[j] > arr[j + 1]) {
//                 const temp = arr[j]
//                 arr[j] = arr[j + 1]
//                 arr[j + 1] = temp
//             }
//         }
//     }
// }

createApp(App)
    // .use(pinia)
    .mount("#app")
