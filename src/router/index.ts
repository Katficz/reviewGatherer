import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/reviewList',
  },
  {
    path: '/reviewList',
    name: 'Lista ankiet',
    component: () => import('../views/ReviewListPage.vue'),
  },
  {
    path: '/addReview',
    name: 'Dodaj ankietę',
    component: () => import('../views/NewReviewPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
