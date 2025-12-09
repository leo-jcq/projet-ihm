import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Home from './pages/Home.vue';
import Matchs from './pages/Matchs.vue';
import Messages from './pages/Messages.vue';
import NotFound from './pages/NotFound.vue';
import Settings from './pages/Settings.vue';
import User from './pages/User.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/matchs', component: Matchs },
    { path: '/messages', component: Messages },
    { path: '/user/:id', component: User },
    { path: '/settings', component: Settings },
    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
