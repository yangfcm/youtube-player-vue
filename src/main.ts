import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import vuetify from './vuetify'
import router from './router'
import pinia from './pinia'

const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(router)

app.mount('#app')
