<script setup lang="ts">
import type { User } from '@/types/model';
import { User4Outlined } from '@lineiconshq/free-icons';
import { Lineicons } from '@lineiconshq/vue-lineicons';

defineProps<{ user: User }>();

defineEmits<{ follow: [] }>();
</script>

<template>
    <button
        class="follow-btn"
        :class="{ 'follow-btn--followed': user.followed }"
        :title="user.followed ? 'Ne plus suivre' : 'Suivre'"
        @click="$emit('follow')"
    >
        <Lineicons :icon="User4Outlined" class="follow-btn__icon" />
        {{ user.followed ? 'Suivi' : 'Suivre' }}
    </button>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.follow-btn {
    height: 2em;

    @extend %flex-center;
    gap: 0.5em;

    font-size: 0.75em;

    padding: 0 0.75em;

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
