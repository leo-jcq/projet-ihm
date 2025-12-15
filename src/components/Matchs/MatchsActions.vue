<script setup lang="ts">
import { Comment1Outlined, HeartStroke, XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';

defineEmits<{
    action: ['no' | 'like' | 'message'];
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
        <button
            class="match-actions__action match-actions__action--message"
            title="Envoyer un message"
            @click="$emit('action', 'message')"
        >
            <Lineicons :icon="Comment1Outlined" class="match-actions__action__icon" size="32" />
        </button>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.match-actions {
    @extend %flex-center;
    gap: 1.5rem;

    margin-top: 1.5rem;

    &__action {
        @include m.size(4rem);

        @extend %flex-center;

        border: 1px solid currentColor;
        border-radius: 50%;

        color: v.$light-gray;

        background-color: v.$white;

        cursor: pointer;

        @include m.transition-group(0.3s, ease, color, background-color);

        &--no {
            &:hover {
                color: v.$red;

                background-color: v.$light-red;
            }
        }

        &--message {
            &:hover {
                color: v.$blue;

                background-color: v.$light-blue;
            }
        }

        &--like {
            @include m.size(5rem);

            border: none;

            color: v.$white !important;

            background-image: v.$main-gradient;

            transition: scale 0.3s ease;

            &:hover {
                background-image: v.$main-gradient-lighten;

                scale: 1.1;
            }
        }
    }
}
</style>
