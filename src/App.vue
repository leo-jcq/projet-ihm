<script setup lang="ts">
import Header from './layout/Header.vue';
import NavBar from './layout/NavBar.vue';
</script>

<template>
    <Header />

    <div class="app__content">
        <div class="app__content__container">
            <NavBar />
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/variables' as v;

.app {
    &__content {
        width: 100%;

        padding: 1.5rem 1rem;

        display: flex;
        justify-content: center;

        @media screen and (max-width: bp.$extra-large) {
            padding-bottom: calc(51px + 1.5rem);
        }

        &__container {
            width: 100%;
            max-width: v.$content-max-width;

            display: grid;
            gap: v.$top-gap;
            grid-template-columns: 278px 1fr 308px;

            @media screen and (max-width: bp.$extra-large) {
                grid-template-columns: 1fr 278px;
            }
        }
    }
}
</style>
