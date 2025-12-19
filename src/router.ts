import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Home from './pages/Home.vue';
import Matchs from './pages/Matchs.vue';
import Messages from './pages/Messages.vue';
import NotFound from './pages/NotFound.vue';
import Search from './pages/Search.vue';
import Settings from './pages/Settings.vue';
import User from './pages/User.vue';
import Gym from './pages/Gym.vue';
import Route from './pages/Route.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/gym/:id', component: Gym },
    { path: '/matchs', component: Matchs },
    { path: '/messages', component: Messages },
    { path: '/user/:id', component: User },
    { path: '/route/:id', component: Route },
    { path: '/search', component: Search },
    { path: '/settings', component: Settings },
    { path: '/not-found', component: NotFound },
    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
