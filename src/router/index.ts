import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/aaa',
      name: 'aaa',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/aaa.vue')
    },
    {
      path: '/page-suivante',
      name: 'PageSuivante',
      component: () => import('../views/PageSuivante.vue'), // Créez un composant pour afficher les données sur la page suivante
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue'), // Créez un composant pour afficher les données sur la page suivante
    }
  ]
})

export default router
