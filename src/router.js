import { createWebHistory, createRouter } from 'vue-router'

import PageLogin from './components/PageLogin.vue'
import PageTest from './components/Test.vue'
import PageReg from './components/PageReg.vue'
import PagePerformanceS from './components/PagePerformanceS.vue'
import PagePerformanceT from './components/PagePerformanceT.vue'
import PageCalendar from './components/PageCalendar.vue'

const routes = [
  { path: '/', component: PageTest },
  { path: '/reg', component: PageReg },
  { path: '/auth', component: PageLogin },
  { path: '/calendar', component: PageCalendar },
  {
    path: '/perfomanceS',
    component: PagePerformanceS,
    // beforeEnter(to, from, next) {
    //   // const role = to.query.role || this.userRole
    //   // const component =
    //   //   role === 'teacher' ? PagePerformanceTeacher : PagePerformanceStudent
    //   // next({ path: to.path, component })
    // },
  },
  { path: '/perfomanceT', component: PagePerformanceT },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
