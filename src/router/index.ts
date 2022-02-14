import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Orders from '../views/Orders.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
