import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: FirebaseSigninView
  // },
  // {
  //   path: '/Register',
  //   name: 'Register',
  //   component: FirebaseRegisterView
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
