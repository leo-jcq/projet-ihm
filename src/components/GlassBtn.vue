<template>
    <button class="glass-btn">
        <slot />
    </button>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.glass-btn {
    aspect-ratio: 1/1;

    position: relative;

    padding: 0.5rem;

    cursor: pointer;

    border: none;
    border-radius: 50%;

    @extend %flex-center;

    background-color: transparent;

    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background-color: v.$very-light-gray;
    }
}
</style>
