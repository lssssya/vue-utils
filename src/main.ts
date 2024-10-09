import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import pinia from './stores'
app.use(pinia)

import router from './router'
app.use(router)

import '@/style/index.scss'


/* final */
app.mount('#app')
