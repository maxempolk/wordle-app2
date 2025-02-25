import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useRealWordStore } from './stores/realWord'

const app = createApp(App)

app.use(createPinia())

useRealWordStore().fetchWord()

app.mount('#app')
