<script setup lang="ts">
import logo from '@/assets/logo.svg';
import Notifications from '@/components/Notifications.vue';
import PostForm from '@/components/Posts/PostForm.vue';
import SearchBar from '@/components/Search/SearchBar.vue';
import UserActions from '@/components/Users/UserActions.vue';
</script>

<template>
    <header class="header">
        <div class="header__content">
            <RouterLink to="/" class="header__content__left">
                <img :src="logo" alt="Logo" class="header__logo" />
                <h1 class="header__title">VerticalMeet</h1>
            </RouterLink>

            <SearchBar class="header__search-bar" />

            <div class="header__content__right">
                <PostForm in-header />
                <Notifications />
                <UserActions />
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@use "@/scss/breakpoints" as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.header {
    @include m.size(100%, v.$header-height);

    background-color: v.$white;

    padding: 0 1rem;

    display: flex;
    justify-content: center;

    position: sticky;
    z-index: 5;
    top: 0;

    border-bottom: 1px solid v.$light-gray;

    &__content {
        width: 100%;
        max-width: v.$content-max-width;

        @extend %flex-between;

        &__left,
        &__right {
            display: flex;
            align-items: center;
        }

        &__left {
            gap: 0.5rem;

            text-decoration: none;

            color: v.$black;
        }

        &__right {
            gap: 1rem;
        }
    }

    &__logo {
        @include m.size(2.5rem);
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 400;
    }

    &__search-bar {
        @media screen and (max-width: bp.$large) {
            display: none;
        }
    }
}
</style>
