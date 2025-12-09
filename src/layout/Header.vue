<script setup lang="ts">
import logo from '@/assets/logo.svg';
import NewPost from '@/components/NewPost.vue';
import Notifications from '@/components/Notifications.vue';
import SearchBar from '@/components/SearchBar.vue';
import UserActions from '@/components/UserActions.vue';
</script>

<template>
    <header class="header">
        <div class="header__content">
            <div class="header__content__left">
                <img :src="logo" alt="Logo" class="header__logo" />
                <h1 class="header__title">VerticalMeet</h1>
            </div>

            <SearchBar />

            <div class="header__content__right">
                <NewPost />
                <Notifications />
                <UserActions />
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.header {
    width: 100%;

    background-color: v.$white;

    padding: 0.5rem 1rem;

    display: flex;
    justify-content: center;

    position: sticky;
    z-index: 1;
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
        }

        &__right {
            gap: 1rem;
        }
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 400;
    }
}
</style>
