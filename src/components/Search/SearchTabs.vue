<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import Tabs from '../Tabs.vue';

const SEARCH_TABS: string[] = ['all', 'posts', 'users', 'routes', 'gyms'];

const SEARCH_TAB_TO_STRING: Record<string, string> = {
    all: 'Tous',
    posts: 'Publications',
    users: 'Utilisateurs',
    routes: 'Voies',
    gyms: 'Salles'
};

defineProps<{ currentTab: string }>();

const route = useRoute();

function changeTab(newTab: string) {
    router.push(`/search?q=${route.query.q}&tab=${newTab}`);
}
</script>

<template>
    <Tabs
        :tabs="SEARCH_TABS"
        :current-tab="currentTab"
        :display-record="SEARCH_TAB_TO_STRING"
        @change="changeTab"
    />
</template>
