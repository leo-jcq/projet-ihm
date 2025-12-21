<script setup lang="ts">
import HomeSide from '@/components/Home/HomeSide.vue';
import FeedPost from '@/components/Posts/FeedPost.vue';
import dataStore from '@/stores/data';
</script>

<template>
    <main class="home__feed">
        <FeedPost :post="dataStore.posts[0]!" />
        <HomeSide in-feed />
        <FeedPost v-for="post in dataStore.posts.slice(1)" :key="post.id" :post="post" />
    </main>

    <HomeSide />
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

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

        @media screen and (max-width: bp.$extra-large) {
            grid-column: 1/2;
        }

        @media screen and (max-width: bp.$medium) {
            grid-column: 1/3;
        }
    }
}
</style>
