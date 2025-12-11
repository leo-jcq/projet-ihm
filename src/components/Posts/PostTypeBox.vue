<script setup lang="ts">
import { PostTypeToDisplay, type TPostType } from '@/enums/PostType';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const props = defineProps<{ type: TPostType }>();

const display = computed(() => PostTypeToDisplay[props.type]);
</script>

<template>
    <div :class="`post-type-box post-type-box--${type}`">
        <Lineicons :icon="display.icon" class="post-type-box__icon" />
        {{ display.text }}
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.post-type-box {
    $height: 1.75rem;

    height: $height;

    border-radius: $height;

    padding: 0 0.75rem;

    @extend %flex-center;
    gap: 0.5rem;

    font-size: 0.75rem;

    &--success {
        color: v.$green;

        background-color: v.$light-green;
    }

    &--project {
        color: v.$blue;

        background-color: v.$light-blue;
    }

    &--other {
        color: v.$orange;

        background-color: v.$light-orange;
    }

    &__icon {
        width: 1.5em;
    }
}
</style>
