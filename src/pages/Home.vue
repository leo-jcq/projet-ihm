<script setup lang="ts">
import FeedPost from '@/components/Posts/FeedPost.vue';
import FollowBtn from '@/components/Users/FollowBtn.vue';
import UserModal from '@/components/Users/UserModal.vue';
import dataStore from '@/stores/data';
import {
    BarChart4Outlined,
    Bolt2Outlined,
    CheckOutlined,
    HeartStroke,
    MapPin5Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const suggestions = computed(() => dataStore.users.slice(0, 3));
</script>

<template>
    <main class="home__feed">
        <FeedPost v-for="post in dataStore.posts" :key="post.id" :post="post" />
    </main>

    <div class="home__side">
        <div class="home__side__box">
            <h3 class="home__side__box__title">
                <Lineicons :icon="Bolt2Outlined" class="home__side__box__title__icon" />
                Suggestions de match
            </h3>

            <ul class="home__suggestions__list">
                <li
                    v-for="user in suggestions"
                    :key="user.id"
                    class="home__suggestions__suggestion"
                >
                    <UserModal :user="user" link />

                    <FollowBtn text="Liker" followed-text="Liké" :icon="HeartStroke" />
                </li>
            </ul>
        </div>

        <div class="home__side__box">
            <h3 class="home__side__box__title">
                <Lineicons :icon="BarChart4Outlined" class="home__side__box__title__icon" />
                Statistiques
            </h3>

            <div class="home__stats__group">
                <div class="home__stats__group__left">
                    <Lineicons
                        :icon="CheckOutlined"
                        class="home__stats__group__icon home__stats__group__icon--success"
                    />
                    <span class="home__stats__group__left__text">Réussites</span>
                </div>
                <span class="home__stats__group__value">34</span>
            </div>

            <div class="home__stats__group">
                <div class="home__stats__group__left">
                    <Lineicons
                        :icon="MapPin5Outlined"
                        class="home__stats__group__icon home__stats__group__icon--projects"
                    />
                    <span class="home__stats__group__left__text">Projets</span>
                </div>
                <span class="home__stats__group__value">5</span>
            </div>
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
        height: fit-content;

        grid-column: 3/4;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        position: sticky;
        top: calc(v.$header-height + v.$top-gap);

        &__box {
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
        }
    }

    &__suggestions {
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

    &__stats {
        &__group {
            background-color: v.$grayish-white;

            margin-bottom: 0.5rem;
            padding: 0.75rem;

            border-radius: 0.5rem;

            @extend %flex-between;

            &:last-child {
                margin-bottom: 0;
            }

            &__left {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }

            &__icon {
                &--success {
                    color: v.$green;
                }

                &--projects {
                    color: v.$blue;
                }
            }
        }
    }
}
</style>
