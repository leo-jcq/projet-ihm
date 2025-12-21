<script setup lang="ts">
import FollowBtn from '@/components/Users/FollowBtn.vue';
import UserModal from '@/components/Users/UserModal.vue';
import dataStore from '@/stores/data';
import {
    BarChart4Outlined,
    CheckOutlined,
    MapPin5Outlined,
    User4Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';

withDefaults(defineProps<{ inFeed?: boolean }>(), { inFeed: false });

const suggestions = dataStore.users.filter((u) => !u.followed).slice(0, 3);
</script>

<template>
    <div class="home-side" :class="{ 'home-side--feed': inFeed }">
        <div class="home-side__box">
            <h3 class="home-side__box__title">
                <Lineicons :icon="User4Outlined" class="home-side__box__title__icon" />
                Suggestions
            </h3>

            <ul class="home-side__suggestions__list">
                <li
                    v-for="user in suggestions"
                    :key="user.id"
                    class="home-side__suggestions__suggestion"
                >
                    <UserModal :user="user" link />

                    <FollowBtn :user="user" @follow="user.followed = !user.followed" />
                </li>
            </ul>
        </div>

        <div class="home-side__box">
            <h3 class="home-side__box__title">
                <Lineicons :icon="BarChart4Outlined" class="home-side__box__title__icon" />
                Statistiques
            </h3>

            <div class="home-side__stats__group">
                <div class="home-side__stats__group__left">
                    <Lineicons
                        :icon="CheckOutlined"
                        class="home-side__stats__group__icon home-side__stats__group__icon--success"
                    />
                    <span class="home-side__stats__group__left__text">Réussites</span>
                </div>
                <span class="home-side__stats__group__value">34</span>
            </div>

            <div class="home-side__stats__group">
                <div class="home-side__stats__group__left">
                    <Lineicons
                        :icon="MapPin5Outlined"
                        class="home-side__stats__group__icon home-side__stats__group__icon--projects"
                    />
                    <span class="home-side__stats__group__left__text">Projets</span>
                </div>
                <span class="home-side__stats__group__value">5</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.home-side {
    height: fit-content;

    grid-column: 3/4;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    &--feed {
        display: none;
    }

    @media screen and (max-width: bp.$extra-large) {
        grid-column: 2/3;
    }

    @media screen and (max-width: bp.$medium) {
        display: none;

        &--feed {
            display: flex;

            position: static;
        }
    }

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
