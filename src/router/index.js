import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Schedule from '@/pages/Schedule.vue'
import NotFound from '@/pages/NotFound.vue'
import Unit from '@/components/Unit.vue'

const routes = [
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
			})
		} else {
			next()
		}
	} else {
		next() // Make sure to always call next()!
	}
})

export default router
