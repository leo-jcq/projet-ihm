<script setup lang="ts">
import type { Route } from '@/types/model';
import GradeBox from './GradeBox.vue';

withDefaults(
    defineProps<{
        route: Route;
        interactive?: boolean;
    }>(),
    {
        interactive: false
    }
);
</script>

<template>
    <div class="route-box" :class="{ 'route-box--interactive': interactive }">
        <span class="route-box__name">{{ route.name }}, {{ route.location }}</span>
        <GradeBox :grade="route.grade" :route-type="route.type" />
        <span class="route-box__length">{{ route.length }}m</span>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.route-box {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    padding: 0.875rem 1rem;

    background-color: v.$white;

    @extend %default-border;
    border-radius: 0.5rem;

    transition: all 0.2s ease;

    &__name {
        flex: 1;

        font-size: 0.95rem;
        font-weight: 500;
        color: v.$very-dark-gray;
    }

    &__length {
        font-size: 0.875rem;
        font-weight: 400;
        white-space: nowrap;
        color: v.$dark-gray;
    }

    &--interactive {
        cursor: pointer;

        &:hover {
            border-color: v.$accent;

            @extend %default-shadow;

            transform: translateY(-1px);
        }
    }
}
</style>
