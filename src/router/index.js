import { blogStore } from '@/stores/localStorage'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/frontend',
      name: 'frontend',
      component: () => import('../views/frontend/LayoutView.vue'),
      redirect: { name: 'frontendBlog' },
      children: [
        {
          path: 'blog',
          name: 'frontendBlog',
          component: () => import('../views/frontend/blog/ListView.vue')
        },
        {
          path: 'blogdetail',
          name: 'frontendBlogDetail',
          component: () => import('../views/frontend/blog/DetailView.vue')
        }
      ]
    },
    {
      path: '/backend',
      name: 'backend',
      component: () => import('../views/backend/LayoutView.vue'),
      redirect: { name: 'backendBlog' },
      children: [
        {
          path: 'blog',
          name: 'backendBlog',
          component: () => import('../views/backend/blog/ListView.vue')
        },
        {
          path: 'blogedit',
          name: 'backendBlogEdit',
          component: () => import('../views/backend/blog/EditView.vue')
        }
      ]
    }
  ]
})

// global navigation guard
router.beforeEach((to, from, next) => {
  const isLogedin = blogStore.value.is_login

  if (to.fullPath.startsWith('/backend') && !isLogedin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
