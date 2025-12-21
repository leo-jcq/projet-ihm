<template>
    <button type="button" class="glass-btn">
        <slot />
    </button>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.glass-btn {
    aspect-ratio: 1/1;

    position: relative;

    padding: 0.5em;

    cursor: pointer;

    border: none;
    border-radius: 50%;

    @extend %flex-center;

    background-color: transparent;

    transition: background-color 0.3s ease;

    @include m.hover() {
        background-color: v.$very-light-gray;
    }
}
</style>
