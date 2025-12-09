<script setup lang="ts">
import FeedPost from '@/components/FeedPost.vue';
import dataStore from '@/stores/data';
import { computed } from 'vue';

const sortedPosts = computed(() =>
    dataStore.posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
);
</script>

<template>
    <div class="home__feed">
        <FeedPost v-for="post in sortedPosts" :key="post.id" :post="post" />
    </div>
    <div class="home__side" />
</template>

<style lang="scss">
.home {
    &__feed,
    &__side {
        width: 100%;
    }

    &__feed {
        grid-column: 2/3;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__side {
        grid-column: 3/4;
    }
}
</style>
