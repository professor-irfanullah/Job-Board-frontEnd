import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../store/useUserState'
const routes = [
    {
        path: '/home',
        component: () => import('../views/seeker_profile/homeVue.vue')
    },
    {
        path: '/',
        component: () => import('../views/seeker_profile/registerVue.vue')
    },
    {
        path: '/login',
        component: () => import('../views/seeker_profile/loginVue.vue')
    },
    {
        path: '/profile',
        component: () => import('../views/seeker_profile/profileVue.vue')
    },

    {
        path: '/dashboard',
        component: () => import('../views/seeker_profile/dashBoard.vue')
    },
    {
        path: '/find-jobs',
        component: () => import('../views/seeker_profile/jobsView.vue')
    },
    {
        path: '/applications',
        component: () => import('../views/seeker_profile/application.vue')
    },

    {
        path: '/accountSetting',
        component: () => import('../views/seeker_profile/accountSettings.vue')
    },
    {
        path: '/saved-jobs',
        component: () => import('../views/seeker_profile/savedJobs.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/seeker_profile/notFound.vue') // Create this component
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
    const role = isAuth?.user?.user?.role
    console.log(role);
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