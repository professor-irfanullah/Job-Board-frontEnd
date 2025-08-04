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
        component: () => import('../views/seeker_profile//savedJobs.vue')
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
/**
router.beforeEach(async (to, from, next) => {
    const isAuth = useAuthStore()
    const role = isAuth?.user?.user?.role

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
     */
router.beforeEach(async (to, from, next) => {
    const beforeAuthRoutesForSeeker = ['/home', '/find-jobs', '/companies', '/resources']
    const afterAuthRoutesForSeeker = ['/dashboard', '/profile', '/saved-jobs', '/applications', '/accountSetting']
    const avoidAfterAuth = ['/', '/login']
    const userStore = useAuthStore()
    const role = userStore?.user?.user?.role
    const isAuthenticated = await userStore.userAuthStatus()
    // avoid to access login or register for employee
    if (isAuthenticated && avoidAfterAuth.includes(to.path) && role === 'employee') {
        return next('/employee_dashboard')
    }
    // avoid to access login or register for seeker
    if (isAuthenticated && avoidAfterAuth.includes(to.path) && role === 'seeker') {
        return next('/dashboard')
    }


    // prevent beforeAuthRoutesForSeeker 
    if (!isAuthenticated && afterAuthRoutesForSeeker.includes(to.path)) {
        return next('/home')
    }

    if (isAuthenticated && role === 'employee' && (beforeAuthRoutesForSeeker.includes(to.path) || afterAuthRoutesForSeeker.includes(to.path))) {
        return next('/employee_route')
    }

    next()

})

export default router