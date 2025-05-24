import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: () => import('../views/registerVue.vue')
    },
    {
        path: '/tempNav',
        component: () => import('../components/navbar2.0.vue')
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