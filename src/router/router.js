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
    // employee specific routes
    {
        path: '/employee-profile',
        component: () => import('../views/employee_profile/employeeProfile.vue')
    },
    {
        path: '/employee-dashboard',
        component: () => import('../views/employee_profile/dashboard.vue')
    },

    {
        path: '/my-jobs',
        component: () => import('../views/employee_profile/myJobs.vue')
    },
    {
        path: '/applicants',
        component: () => import('../views/employee_profile/applicants.vue')
    },
    {
        path: '/company-profile',
        component: () => import('../views/employee_profile/companyProfile.vue')
    },
    {
        path: '/view-company/:id',
        name: 'company',
        component: () => import('../components/companyInfo.vue'),
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
const employerOnlyRoutes = ['/employee-dashboard', '/employee-profile', '/my-jobs', '/applicants', '/company-profile']
router.beforeEach(async (to, from, next) => {
    const beforeAuthRoutesForSeeker = ['/home', '/find-jobs', '/companies', '/resources']
    const afterAuthRoutesForSeeker = ['/dashboard', '/profile', '/saved-jobs', '/applications', '/accountSetting']
    const avoidAfterAuth = ['/', '/login']
    const userStore = useAuthStore()
    const role = userStore?.user?.user?.role
    const isAuthenticated = await userStore.userAuthStatus()
    // avoid to access login or register for employee
    if (isAuthenticated && avoidAfterAuth.includes(to.path) && role === 'employee') {
        return next('/employee-dashboard')
    }
    if (!isAuthenticated && employerOnlyRoutes.includes(to.path)) {
        return next('/home')
    }
    if (isAuthenticated && avoidAfterAuth.includes(to.path) && role === 'seeker') {
        return next('/dashboard')
    }


    // prevent beforeAuthRoutesForSeeker 
    if (!isAuthenticated && (afterAuthRoutesForSeeker.includes(to.path) || employerOnlyRoutes.includes(to.path))) {
        return next('/home')
    }

    if (isAuthenticated && role === 'employee' && (beforeAuthRoutesForSeeker.includes(to.path) || afterAuthRoutesForSeeker.includes(to.path))) {
        return next('/employee-dashboard')
    }


    next()

})

export default router