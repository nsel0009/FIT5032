import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import UserIndexView from '../views/users/UserIndexView.vue'
import SessionIndexView from '../views/sessions/SessionIndexView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RatingIndexView from '@/views/ratings/RatingIndexView.vue'
import RatingAddView from '@/views/ratings/RatingAddView.vue'

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
  {
    path: '/Ratings/Index',
    name: 'View All Ratings',
    component: RatingIndexView
  },
  {
    path: '/Ratings/Add',
    name: 'Add New Rating',
    component: RatingAddView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
