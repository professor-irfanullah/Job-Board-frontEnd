import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
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

export default router