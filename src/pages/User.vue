<script setup lang="ts">
import usePageTitle from '@/composables/usePageTitle';
import router from '@/router';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const user = computed(() => {
    if (userStore.user!.id.toString() === route.params.id) {
        return userStore.user!;
    }

    return dataStore.users.find((u) => u.id.toString() === route.params.id);
});

if (!user.value) {
    router.push('/not-found');
}

usePageTitle(user.value!.name);
</script>

<template>
    {{ user!.name }}
</template>

<style lang="scss"></style>
