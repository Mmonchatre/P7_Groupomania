import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})




export default router
