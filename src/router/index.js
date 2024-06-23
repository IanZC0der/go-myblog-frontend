import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
    },
    {
      path: '/frontend',
      name: 'frontend',
      component: () => import('../views/frontend/LayoutView.vue'),
      children: [
        {
          path: 'blog',
          name: 'frontendBlog',
          component: () => import('../views/frontend/blog/ListView.vue'),
        }
      ]
    },
    {
      path: '/backend',
      name: 'backend',
      component: () => import('../views/backend/LayoutView.vue'),
      children: [
        {
          path: 'blog',
          name: 'backendBlog',
          component: () => import('../views/backend/blog/ListView.vue'),
        }
      ]
    },
  ]
})

export default router
