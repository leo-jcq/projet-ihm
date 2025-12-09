<script setup lang="ts">
import FeedPost from '@/components/FeedPost.vue';
import UserModal from '@/components/UserModal.vue';
import dataStore from '@/stores/data';
import { Bolt2Outlined, HeartStroke } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const sortedPosts = computed(() =>
    dataStore.posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
);

const suggestions = computed(() => dataStore.users.slice(0, 3));
</script>

<template>
    <div class="home__feed">
        <FeedPost v-for="post in sortedPosts" :key="post.id" :post="post" />
    </div>
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

                    <button class="home__suggestions__suggestion__like">
                        <Lineicons
                            :icon="HeartStroke"
                            class="home__suggestions__suggestion__like__icon"
                        />
                        Liker
                    </button>
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

            &__like {
                display: flex;
                gap: 0.5rem;
                align-items: center;

                font-size: 0.75rem;

                padding: 0.25rem 0.75rem;

                cursor: pointer;

                color: v.$white;

                background-image: v.$main-gradient;

                border: none;
                border-radius: 9999px;

                &:hover {
                    background-image: v.$main-gradient-lighten;
                }

                &__icon {
                    width: 1.5em;
                }
            }
        }
    }
}
</style>
