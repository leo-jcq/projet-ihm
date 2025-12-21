<script setup lang="ts">
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import {
    Bolt2Outlined,
    Envelope1Outlined,
    Gear1Outlined,
    Home2Outlined,
    Search2Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const nbUnreadMessages = computed(
    () => dataStore.messages.filter((message) => !message.read).length
);
</script>

<template>
    <div class="nav-bar">
        <RouterLink to="/me" class="nav-bar__user">
            <img
                class="nav-bar__user__avatar"
                :src="userStore.user.avatar"
                :alt="userStore.user.name"
            />
            <h2 class="nav-bar__user__name">{{ userStore.user.name }}</h2>
            <span class="nav-bar__user__pseudo">@{{ userStore.user.pseudo }}</span>
        </RouterLink>

        <nav class="nav-bar__nav">
            <RouterLink to="/" class="nav-bar__nav__link">
                <Lineicons :icon="Home2Outlined" class="nav-bar__nav__link__icon" />
                <span class="nav-bar__nav__link__text">Accueil</span>

                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/search" class="nav-bar__nav__link nav-bar__nav__link--search">
                <Lineicons :icon="Search2Outlined" class="nav-bar__nav__link__icon" />
                <span class="nav-bar__nav__link__text">Recherche</span>

                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/matchs" class="nav-bar__nav__link">
                <Lineicons :icon="Bolt2Outlined" class="nav-bar__nav__link__icon" />
                <span class="nav-bar__nav__link__text">Matchs</span>

                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/messages" class="nav-bar__nav__link">
                <Lineicons :icon="Envelope1Outlined" class="nav-bar__nav__link__icon" />
                <span class="nav-bar__nav__link__text">Messages</span>

                <span v-if="nbUnreadMessages > 0" class="nav-bar__nav__link__indicator">
                    {{ nbUnreadMessages }}
                </span>
                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/settings" class="nav-bar__nav__link">
                <Lineicons :icon="Gear1Outlined" class="nav-bar__nav__link__icon" />
                <span class="nav-bar__nav__link__text">Paramètres</span>

                <div class="nav-bar__nav__link__bg" />
            </RouterLink>
        </nav>
    </div>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.nav-bar {
    height: fit-content;

    padding: 1.5rem;

    @extend %default-box;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    @media screen and (max-width: bp.$extra-large) {
        position: fixed;
        z-index: 50;
        top: unset;
        right: 0;
        bottom: 0;
        left: 0;

        padding: 0;

        display: flex;
        gap: 2rem;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;

        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    &__user {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 1.5rem;

        text-decoration: none;
        color: v.$black;

        @media screen and (max-width: bp.$extra-large) {
            margin-bottom: 0rem;
        }

        &__avatar {
            @include m.rounded(5rem);

            border: 2px solid v.$accent;

            object-fit: cover;

            margin-bottom: 0.75rem;

            @media screen and (max-width: bp.$extra-large) {
                @include m.size(2rem);

                margin-bottom: 0rem;
            }
        }

        &__name,
        &__pseudo {
            @media screen and (max-width: bp.$extra-large) {
                display: none;
            }
        }

        &__name {
            font-size: 1rem;
            font-weight: 400;
        }

        &__pseudo {
            font-size: 0.875rem;
            color: v.$very-dark-gray;

            @include m.hover() {
                text-decoration: underline;
            }
        }
    }

    &__nav {
        display: flex;
        gap: 0.75rem;
        flex-direction: column;

        @media screen and (max-width: bp.$extra-large) {
            flex-direction: row;
        }

        &__link {
            $padding: 1.375rem;

            width: 100%;

            padding: $padding;

            display: flex;
            gap: 0.75rem;
            align-items: center;

            font-size: 1.125rem;
            text-decoration: none;
            color: v.$black;

            border-radius: 0.625rem;

            position: relative;

            transition: color 0.3s ease;

            @media screen and (max-width: bp.$extra-large) {
                @include m.size(3.5rem);

                justify-content: center;

                padding: 0;
            }

            &--search {
                display: none;

                @media screen and (max-width: bp.$large) {
                    display: flex;
                }
            }

            &.router-link-active,
            &:hover {
                color: v.$white;
            }

            &__icon {
                @include m.size(1.5rem);
            }

            &__text {
                @media screen and (max-width: bp.$extra-large) {
                    display: none;
                }
            }

            &__indicator {
                @include m.rounded(1.25rem);

                background-image: v.$main-gradient;

                font-size: 0.75rem;
                color: v.$white;

                @extend %flex-center;

                position: absolute;
                top: 50%;
                right: $padding;
                transform: translateY(-50%);

                @media screen and (max-width: bp.$extra-large) {
                    @include m.size(0.625rem);

                    top: 25%;
                    right: 25%;
                    transform: unset;

                    content-visibility: hidden;
                }
            }

            &.router-link-active &__indicator,
            &:hover &__indicator {
                display: none;
            }

            &__bg {
                position: absolute;
                z-index: -1;
                inset: 0;

                opacity: 0;

                user-select: none;

                border-radius: 0.625rem;

                background-image: v.$main-gradient;

                transition: opacity 0.3s ease;

                @media screen and (max-width: bp.$extra-large) {
                    @include m.size(75%);

                    inset: unset;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &.router-link-active &__bg,
            &:hover &__bg {
                opacity: 1;
            }
        }
    }
}
</style>
