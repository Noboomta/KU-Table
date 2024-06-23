import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Schedule = () => import('@/pages/Schedule.vue')
const NotFound = () => import('@/pages/NotFound.vue')
const Unit = () => import('@/components/Unit.vue')
const Login = () => import('@/pages/Login.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true },
  },
  {
    path: '/unit',
    name: 'Unit',
    component: Unit,
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('accessToken')) {
      next({
        path: '/login',
        replace: true,
      })
    } else {
      next()
    }
  } else {
    next() // Make sure to always call next()!
  }
})

export default router
