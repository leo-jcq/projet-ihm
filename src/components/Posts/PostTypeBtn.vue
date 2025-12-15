<script setup lang="ts">
import { PostTypeToDisplay, type TPostType } from '@/enums/PostType';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const props = defineProps<{ type: TPostType; active?: boolean }>();

const display = computed(() => PostTypeToDisplay[props.type]);
</script>

<template>
    <button
        type="button"
        :class="['post-type-btn', `post-type-btn--${type}`, { 'post-type-btn--active': active }]"
    >
        <Lineicons :icon="display.icon" />
        {{ display.text }}
    </button>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.post-type-btn {
    @include m.size(200px, 50px);

    @extend %default-border;
    border-radius: 0.5rem;

    background-color: v.$white;

    cursor: pointer;

    @extend %flex-center;
    gap: 0.25rem;

    @include m.transition-group(0.3s, ease, color, background-color, border-color);

    &--success {
        &:hover,
        &.post-type-btn--active {
            border-color: v.$green;

            color: v.$green;

            background-color: v.$light-green;
        }
    }

    &--project {
        &:hover,
        &.post-type-btn--active {
            border-color: v.$blue;

            color: v.$blue;

            background-color: v.$light-blue;
        }
    }

    &--other {
        &:hover,
        &.post-type-btn--active {
            border-color: v.$orange;

            color: v.$orange;

            background-color: v.$light-orange;
        }
    }
}
</style>
