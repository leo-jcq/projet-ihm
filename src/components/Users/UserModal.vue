<script setup lang="ts">
import RouteType from '@/enums/RouteType';
import dataStore from '@/stores/data';
import type { User } from '@/types/model';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import GradeBox from '../Routes/GradeBox.vue';

const props = withDefaults(
    defineProps<{
        user?: User;
        userId?: number;
        secondary?: string;
        link?: boolean;
        displayLevel?: boolean;
    }>(),
    { user: undefined, userId: undefined, secondary: undefined, link: false, displayLevel: false }
);

const finalUser = computed(() =>
    props.user ? props.user : dataStore.users.find((user) => user.id === props.userId)
);
</script>

<template>
    <component
        :is="link ? RouterLink : 'div'"
        v-if="finalUser"
        :to="`/user/${finalUser.id}`"
        class="user-modal"
    >
        <img :src="finalUser.avatar" :alt="finalUser.pseudo" class="user-modal__avatar" />

        <div class="user-modal__text">
            <span class="user-modal__text__name">{{ finalUser.name }}</span>
            <span class="user-modal__text__secondary">
                {{ secondary ?? `@${finalUser.pseudo}` }}
            </span>
        </div>

        <GradeBox
            v-if="displayLevel"
            :grade="finalUser.level"
            :route-type="RouteType.Route"
            class="user-modal__level"
        />
    </component>
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

        object-fit: cover;
    }

    &__text {
        &__name {
            display: block;
        }

        &__secondary {
            font-size: 0.75em;
            font-weight: 300;
            color: v.$very-dark-gray;
        }
    }

    &__level {
        align-self: flex-start;
    }
}
</style>
