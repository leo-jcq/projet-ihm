<script setup lang="ts">
import { RouteTypeToString } from '@/enums/RouteType';
import type { Route } from '@/types/model';
import { RouterLink } from 'vue-router';
import GradeBox from './GradeBox.vue';

withDefaults(
    defineProps<{
        route: Route;
        interactive?: boolean;
        link?: boolean;
    }>(),
    {
        interactive: false,
        link: false
    }
);
</script>

<template>
    <component
        :is="link ? RouterLink : 'div'"
        :to="`/route/${route.id}`"
        class="route-box"
        :class="{ 'route-box--interactive': interactive, 'route-box--link': link }"
    >
        <span class="route-box__name">{{ route.name }}, {{ route.location }}</span>
        <span class="route-box__type">{{ RouteTypeToString[route.type] }}</span>
        <GradeBox :grade="route.grade" :route-type="route.type" />
        <span class="route-box__length">{{ route.length }}m</span>
    </component>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.route-box {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    text-decoration: none;

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

    &:hover &__name {
        text-decoration: underline;
    }

    &__length {
        font-size: 0.875rem;
        font-weight: 400;
        white-space: nowrap;
        color: v.$dark-gray;
    }

    &__type {
        width: fit-content;

        font-size: 0.875rem;
        color: v.$grayish-black;

        padding: 0.375rem 0.75rem;

        border-radius: 9999px;

        background-color: v.$very-light-gray;
    }

    &--interactive {
        cursor: pointer;

        @include m.hover() {
            border-color: v.$accent;

            box-shadow: 0 1px 3px rgba(v.$black, 10%), 0 1px 2px -1px rgba(v.$black, 10%);

            transform: translateY(-1px);
        }
    }
}
</style>
