<script setup lang="ts">
import type { User } from '@/types/model';
import { getAssetPath } from '@/utils/files';
import { RouterLink } from 'vue-router';

withDefaults(defineProps<{ user: User; secondary?: string; link?: boolean }>(), {
    secondary: undefined,
    link: true
});
</script>

<template>
    <RouterLink :to="link ? `/user/${user.id}` : ''" class="user-modal">
        <img :src="getAssetPath(user.avatar)" :alt="user.pseudo" class="user-modal__avatar" />

        <div class="user-modal__text">
            <span class="user-modal__text__name">{{ user.name }}</span>
            <span class="user-modal__text__secondary">
                {{ secondary ?? `@${user.pseudo}` }}
            </span>
        </div>
    </RouterLink>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.user-modal {
    display: flex;
    gap: 0.75em;
    align-items: center;

    color: v.$black;
    text-decoration: none;

    &__avatar {
        @include m.rounded(2.5em);
    }

    &__text {
        &__name,
        &__time {
            display: block;
        }

        &__secondary {
            font-size: 0.75em;
            font-weight: 300;
            color: v.$very-dark-gray;
        }
    }
}
</style>
