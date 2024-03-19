import { createApp } from 'vue'
import VueSelect from 'vue-select'
import App from './App.vue'
import 'vue-select/dist/vue-select.css'
import './style.css'

import router from './router.js'

createApp(App).component('v-select', VueSelect).use(router).mount('#app')
