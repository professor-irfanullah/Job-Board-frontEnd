import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'
const protectedRoute = 'http://localhost:3000/api/auth/protected'
const routes = [
    {
        path: '/home',
        component: () => import('../views/homeVue.vue')
    },
    {
        path: '/',
        component: () => import('../views/registerVue.vue')
    },
    {
        path: '/login',
        component: () => import('../views/loginVue.vue')
    },
    {
        path: '/profile',
        component: () => import('../views/myProfile.vue')
    },

    {
        path: '/dashboard',
        component: () => import('../views/dashBoard.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/notFound.vue') // Create this component
    }
]
const router = createRouter(
    {
        history: createWebHashHistory(),
        routes,
    }
)
const isAuth = async () => {
    try {
        const response = await axios.post(protectedRoute, {}, { withCredentials: true })
        if (response.data.user.user_id) return true;
        return false
    } catch (error) {
        return false
    }
}
const publicPaths = ['/', '/login']
const privatePaths = ['/dashboard', '/profile', '/saved-job', '/accout-setting', 'sign-out', '/application']
router.beforeEach(async (to, from, next) => {
    const isPublic = publicPaths.includes(to.path)
    const isPrivate = privatePaths.includes(to.path)
    const isAuthenticated = await isAuth()
    if (isAuthenticated && isPublic) {
        return next('/home')
    }
    if (!isAuthenticated && isPrivate) {
        return next('/home')
    }
    next()
})

export default router