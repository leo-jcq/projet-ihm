<script setup lang="ts">
import { User4Outlined } from '@lineiconshq/free-icons';
import { Lineicons, type IconData } from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';

withDefaults(defineProps<{ text?: string; followedText?: string; icon?: IconData }>(), {
    text: 'Suivre',
    followedText: 'Suivi',
    icon: User4Outlined
});

const followed = ref(false);
</script>

<template>
    <button
        class="follow-btn"
        :class="{ 'follow-btn--followed': followed }"
        :title="followed ? `Ne plus ${text.toLowerCase()}` : text"
        @click="followed = !followed"
    >
        <Lineicons :icon="icon" class="follow-btn__icon" />
        {{ followed ? followedText : text }}
    </button>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.follow-btn {
    height: 2rem;

    @extend %flex-center;
    gap: 0.5rem;

    font-size: 0.75rem;

    padding: 0 0.75rem;

    cursor: pointer;

    color: v.$white;

    background-image: v.$main-gradient;

    border: none;
    border-radius: 9999px;

    &:hover {
        background-image: v.$main-gradient-lighten;
    }

    &--followed {
        background-image: none;
        background-color: v.$grayish-black;

        transition: background-color 0.3s ease;

        &:hover {
            background-image: none;
            background-color: color.adjust(v.$grayish-black, $lightness: 5%);
        }
    }

    &__icon {
        width: 1.5em;
    }
}
</style>
