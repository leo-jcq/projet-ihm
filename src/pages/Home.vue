<script setup lang="ts">
import FeedPost from '@/components/Posts/FeedPost.vue';
import FollowBtn from '@/components/Users/FollowBtn.vue';
import UserModal from '@/components/Users/UserModal.vue';
import dataStore from '@/stores/data';
import { Bolt2Outlined, HeartStroke } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const sortedPosts = computed(() =>
    dataStore.posts.sort((a, b) => b.date.getTime() - a.date.getTime())
);

const suggestions = computed(() => dataStore.users.slice(0, 3));
</script>

<template>
    <main class="home__feed">
        <FeedPost v-for="post in sortedPosts" :key="post.id" :post="post" />
    </main>
    <div class="home__side">
        <div class="home__suggestions">
            <h3 class="home__suggestions__title">
                <Lineicons :icon="Bolt2Outlined" class="home__suggestions__title__icon" />
                Suggestions de match
            </h3>

            <ul class="home__suggestions__list">
                <li
                    v-for="user in suggestions"
                    :key="user.id"
                    class="home__suggestions__suggestion"
                >
                    <UserModal :user="user" />

                    <FollowBtn text="Liker" followed-text="Liké" :icon="HeartStroke" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
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
    }

    &__side {
        grid-column: 3/4;
    }

    &__suggestions {
        @extend %default-box;

        padding: 1.5rem;

        &__title {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            margin-bottom: 1rem;

            font-size: 1rem;
            font-weight: 400;

            &__icon {
                color: v.$accent;
            }
        }

        &__list {
            list-style: none;

            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        &__suggestion {
            @extend %flex-between;
        }
    }
}
</style>
