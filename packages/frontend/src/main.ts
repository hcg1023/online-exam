import { createApp } from 'vue'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'
import { createRouter, createWebHistory } from 'vue-router'

import '@unocss/reset/normalize.css'
import 'uno.css'
import '~/assets/styles/index.less'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
