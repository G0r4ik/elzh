import { createApp } from 'vue'
import VueSelect from 'vue-select'
import App from './App.vue'
import 'vue-select/dist/vue-select.css'
import './style.css'

import { createPinia } from 'pinia'

const pinia = createPinia()

import router from './router.js'
createApp(App)
  .component('v-select', VueSelect)
  .use(pinia)
  .use(router)
  .mount('#app')
