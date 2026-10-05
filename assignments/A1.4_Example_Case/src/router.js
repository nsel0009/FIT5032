import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CollectionIndexView from './views/CollectionIndexView.vue'
import CollectionFormView from './views/CollectionFormView.vue'
import DocumentView from './views/DocumentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sessions', name: 'sessions', component: CollectionIndexView, props: { collection: 'sessions' } },
    { path: '/sessions/new', name: 'session-new', component: CollectionFormView, props: { collection: 'sessions' } },
    { path: '/sessions/:id', name: 'session-detail', component: DocumentView, props: { collection: 'sessions' } },
    { path: '/ratings', name: 'ratings', component: CollectionIndexView, props: { collection: 'ratings' } },
    { path: '/ratings/new', name: 'rating-new', component: CollectionFormView, props: { collection: 'ratings' } },
    { path: '/ratings/:id', name: 'rating-detail', component: DocumentView, props: { collection: 'ratings' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
