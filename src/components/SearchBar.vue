<script setup lang="ts">
import { Search2Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
</script>

<template>
    <div class="search-bar">
        <input
            type="text"
            class="search-bar__input"
            placeholder="Rechercher des grimpeurs, des voies..."
        />
        <Lineicons :icon="Search2Outlined" class="search-bar__icon" />
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.search-bar {
    position: relative;

    &__input {
        @include m.size(450px, 42px);

        font-size: 1rem;

        padding: 0 1rem 0 2.5rem;

        border: 1px solid v.$light-gray;
        border-radius: 9999px;
        outline-color: v.$accent;

        background-color: v.$very-light-gray;

        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__icon {
        height: 1.25rem;

        color: v.$dark-gray;

        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
