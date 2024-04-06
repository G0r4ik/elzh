import { createWebHistory, createRouter } from 'vue-router'

import PageLogin from './components/PageLogin.vue'
import PageTest from './components/Test.vue'
import PageReg from './components/PageReg.vue'
import PagePerformanceS from './components/PagePerformanceS.vue'
import PagePerformanceT from './components/PagePerformanceT.vue'
import PageCalendar from './components/PageCalendar.vue'
import Admin from './components/Admin.vue'
import api from './api'
import { useUserStore } from './store.js'

const priv = {
  admin: ['/admin'],
  student: ['/perfomanceS', '/calendar'],
  teacher: ['/perfomanceT'],
}

const routes = [
  { path: '/', component: PageTest },
  { path: '/admin', component: Admin },
  { path: '/reg', component: PageReg },
  { path: '/auth', component: PageLogin },
  { path: '/calendar', component: PageCalendar },
  { path: '/perfomanceS', component: PagePerformanceS },
  { path: '/perfomanceT', component: PagePerformanceT },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  if (to.path !== '/auth' && to.path !== '/reg') {
    await checkAndRedirect(to, from, next)
  } else {
    next()
  }
})

async function checkAndRedirect(to, from, next) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (!token) {
    localStorage.clear('role')
    return next('/auth')
  }
  try {
    const response = await api.post('/checkToken', { token })
    if (response.data.isValid) {
      // fixme
      if (priv[role].includes(to.path)) next()
      else next(priv[role][0])
    } else {
      localStorage.removeItem('role')
      localStorage.removeItem('token')
      return next('/auth')
    }
  } catch (error) {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    console.error('Ошибка проверки токена:', error)
    return next('/auth')
  }
}
export default router
