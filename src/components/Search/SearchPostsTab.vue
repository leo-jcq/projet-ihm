<script setup lang="ts">
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import FeedPost from '../Posts/FeedPost.vue';

const props = defineProps<{ preDisplay: boolean }>();

const route = useRoute();

const posts = computed(() => {
    const query = route.query.q ? String(route.query.q) : '';

    const posts = dataStore.posts.filter((post) => {
        const author = dataStore.users.find((user) => user.id === post.authorId);
        return (
            post.content.includes(query) ||
            (author && (author.name.includes(query) || author.pseudo.includes(query)))
        );
    });

    return props.preDisplay ? posts.slice(0, 5) : posts;
});
</script>

<template>
    <div v-if="posts.length > 0 || !preDisplay" class="search-posts-tab">
        <h3 v-if="preDisplay" class="search-posts-tab__title">Posts</h3>

        <div class="search-posts-tab__posts">
            <FeedPost v-for="post in posts" :key="post.id" :post="post" />
            <span v-if="posts.length === 0" class="search-posts-tab__posts__empty">
                Aucun post trouvé.
            </span>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-posts-tab {
    &__title {
        margin-bottom: 1em;

        font-size: 1rem;
        font-weight: 500;
    }

    &__posts {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        &__empty {
            color: v.$grayish-black;
        }
    }
}
</style>
