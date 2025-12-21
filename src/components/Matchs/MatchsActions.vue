<script setup lang="ts">
import { HeartStroke, XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';

defineEmits<{
    action: ['no' | 'like'];
}>();
</script>

<template>
    <div class="match-actions">
        <button
            class="match-actions__action match-actions__action--no"
            @click="$emit('action', 'no')"
        >
            <Lineicons :icon="XmarkOutlined" class="match-actions__action__icon" size="38" />
        </button>
        <button
            class="match-actions__action match-actions__action--like"
            title="Liker"
            @click="$emit('action', 'like')"
        >
            <Lineicons :icon="HeartStroke" class="match-actions__action__icon" size="42" />
        </button>
    </div>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.match-actions {
    @extend %flex-center;
    gap: 1.5rem;

    margin-top: 1.5rem;

    &__action {
        @include m.size(4.5rem);

        @extend %flex-center;

        border: 1px solid currentColor;
        border-radius: 50%;

        position: relative;

        cursor: pointer;

        @include m.transition-group(0.3s, ease, color, background-color, scale);

        @include m.hover() {
            scale: 1.1;

            color: v.$white;

            &::before {
                opacity: 1;
            }
        }

        @media screen and (max-width: bp.$medium) {
            @include m.size(3rem);
        }

        &:active {
            scale: 0.9;
        }

        &::before {
            content: '';

            position: absolute;
            z-index: -1;
            inset: 0;

            opacity: 0;

            border-radius: 50%;

            background-image: v.$main-gradient;

            transition: opacity 0.3s ease;
        }

        &--no {
            color: v.$red;

            background-color: v.$light-red;
        }

        &--like {
            color: v.$blue;

            background-color: v.$light-blue;
        }

        &__icon {
            @media screen and (max-width: bp.$medium) {
                @include m.size(2rem);
            }
        }
    }
}
</style>
