<script setup lang="ts">
import Header from './layout/Header.vue';
import NavBar from './layout/NavBar.vue';
import Login from './pages/Login.vue';
import userStore from './stores/user';
</script>

<template>
    <template v-if="userStore.user">
        <Header />

        <div class="app__content">
            <div class="app__content__container">
                <NavBar />
                <RouterView />
            </div>
        </div>
    </template>

    <Login v-else />
</template>

<style lang="scss">
@use '@/scss/variables' as v;

.app {
    &__content {
        width: 100%;

        padding: 1.5rem 1rem;

        display: flex;
        justify-content: center;

        &__container {

            width: 100%;
            max-width: v.$content-max-width;

            display: grid;
            gap: 1.5rem;
            grid-template-columns: 278px 1fr 308px;
        }
    }
}
</style>
