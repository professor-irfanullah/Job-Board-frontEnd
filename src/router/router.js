import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../store/useUserState'
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
        component: () => import('../views/profileVue.vue')
    },

    {
        path: '/dashboard',
        component: () => import('../views/dashBoard.vue')
    },
    {
        path: '/find-jobs',
        component: () => import('../views/jobsView.vue')
    },
    {
        path: '/applications',
        component: () => import('../views/application.vue')
    },

    {
        path: '/accountSetting',
        component: () => import('../views/accountSettings.vue')
    },
    {
        path: '/saved-jobs',
        component: () => import('../views/savedJobs.vue')
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

const publicPaths = ['/', '/login']
const privatePaths = ['/dashboard', '/profile', '/saved-jobs', '/accountSetting', 'sign-out', '/applications']
router.beforeEach(async (to, from, next) => {
    const isAuth = useAuthStore()
    const isAuthenticated = await isAuth.userAuthStatus()
    const isPublic = publicPaths.includes(to.path)
    const isPrivate = privatePaths.includes(to.path)
    if (isAuthenticated && isPublic) {
        return next('/home')
    }
    if (!isAuthenticated && isPrivate) {
        return next('/home')
    }
    next()
})

export default router