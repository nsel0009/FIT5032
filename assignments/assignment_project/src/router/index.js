import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import UserIndexView from '../views/users/UserIndexView.vue'
import SessionIndexView from '../views/sessions/SessionIndexView.vue'
import LoginView from '@/views/auth/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterView
  },
    {
    path: '/Users/Index',
    name: 'View All Users',
    component: UserIndexView
  },
    {
    path: '/Sessions/Index',
    name: 'View All Sessions',
    component: SessionIndexView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
