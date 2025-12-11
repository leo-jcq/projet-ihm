<script setup lang="ts">
import userStore from '@/stores/user';
import { getAssetPath } from '@/utils/files';
import {
    Bolt2Outlined,
    Envelope1Outlined,
    Gear1Outlined,
    Home2Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
</script>

<template>
    <div class="nav-bar">
        <RouterLink :to="`/user/${userStore.user!.id}`" class="nav-bar__user">
            <img
                class="nav-bar__user__avatar"
                :src="getAssetPath(userStore.user!.avatar)"
                :alt="userStore.user!.name"
            />
            <h2 class="nav-bar__user__name">{{ userStore.user!.name }}</h2>
            <span class="nav-bar__user__pseudo">@{{ userStore.user!.pseudo }}</span>
        </RouterLink>

        <nav class="nav-bar__nav">
            <RouterLink to="/" class="nav-bar__nav__link">
                <Lineicons :icon="Home2Outlined" />
                Accueil
                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/matchs" class="nav-bar__nav__link">
                <Lineicons :icon="Bolt2Outlined" />
                Matchs
                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/messages" class="nav-bar__nav__link">
                <Lineicons :icon="Envelope1Outlined" />
                Messages
                <div class="nav-bar__nav__link__bg" />
            </RouterLink>

            <RouterLink to="/settings" class="nav-bar__nav__link">
                <Lineicons :icon="Gear1Outlined" />
                Paramètres
                <div class="nav-bar__nav__link__bg" />
            </RouterLink>
        </nav>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.nav-bar {
    height: fit-content;

    padding: 1.5rem;

    @extend %default-box;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    &__user {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 1.5rem;

        text-decoration: none;
        color: v.$black;

        &__avatar {
            @include m.rounded(5rem);

            border: 2px solid v.$accent;

            margin-bottom: 0.75rem;
        }

        &__name {
            font-size: 1rem;
            font-weight: 400;
        }

        &__pseudo {
            font-size: 0.875rem;
            color: v.$very-dark-gray;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &__nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        &__link {
            width: 100%;

            padding: 1.375rem;

            display: inline-flex;
            gap: 0.75rem;
            align-items: center;

            font-size: 1.125rem;
            text-decoration: none;
            color: v.$black;

            overflow: hidden;

            border-radius: 10px;

            position: relative;

            transition: color 0.3s ease;

            &.router-link-active,
            &:hover {
                color: v.$white;
            }

            &__bg {
                position: absolute;
                z-index: -1;
                inset: 0;

                opacity: 0;

                user-select: none;

                background-image: v.$main-gradient;

                transition: opacity 0.3s ease;
            }

            &.router-link-active &__bg,
            &:hover &__bg {
                opacity: 1;
            }
        }
    }
}
</style>
