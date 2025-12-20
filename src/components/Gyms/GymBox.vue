<script setup lang="ts">
import { RouteTypeToString } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import type { Gym } from '@/types/model';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import RatingStars from '../RatingStars.vue';

const props = withDefaults(
    defineProps<
        (
            | {
                  gym: Gym;
                  id: undefined;
              }
            | {
                  gym: undefined;
                  id: number;
              }
        ) & {
            interactive?: boolean;
            link?: boolean;
            showDetails?: boolean;
        }
    >(),
    {
        interactive: false,
        link: false,
        showDetails: false
    }
);

const finalGym = computed(() =>
    props.gym ? props.gym : dataStore.gyms.find((g) => g.id === props.id)!
);

const averageGrade = computed(() => {
    const grades = dataStore.gymReviews.filter((grade) => grade.gymId === finalGym.value.id);

    if (grades.length === 0) return null;

    let total = 0;

    for (let i = 0; i < grades.length; i++) {
        total += grades[i]!.grade;
    }

    return total / grades.length;
});
</script>

<template>
    <component
        :is="link ? RouterLink : 'div'"
        v-if="finalGym"
        :to="`/gym/${finalGym.id}`"
        class="gym-box"
        :class="{ 'gym-box--link': link, 'gym-box--interactive': interactive }"
    >
        <div class="gym-box__top">
            <div class="gym-box__top__left">
                <img :src="finalGym.logo" :alt="finalGym.name" class="gym-box__logo" />
                <span class="gym-box__name">{{ finalGym.name }}, {{ finalGym.location }}</span>
            </div>
            <RatingStars v-if="showDetails" :rating="averageGrade" />
        </div>
        <div v-if="showDetails" class="gym-box__types">
            <span
                v-for="routeType in finalGym.routeTypes"
                :key="routeType"
                class="gym-box__types__type"
            >
                {{ RouteTypeToString[routeType] }}
            </span>
        </div>
    </component>
</template>

<style lang="scss">
    @use "@/scss/mixins" as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym-box {
    @extend %default-border;
    border-radius: 0.3125rem;

    display: block;

    padding: 0.375rem 0.75rem;

    @extend %default-shadow;

    background-color: v.$white;

    text-decoration: none;
    color: v.$black;

    &--interactive {
        cursor: pointer;

        &:hover {
            border-color: v.$accent;

            @extend %default-shadow;

            transform: translateY(-1px);
        }
    }

    &__top {
        @extend %flex-between;

        &__left {
            display: flex;
            gap: 0.75rem;
            align-items: center;
        }
    }

    &__logo {
        @include m.rounded(2.5rem);

        padding: 0.25rem;

        object-fit: contain; 
    }

    &--link:hover &__name {
        text-decoration: underline;
    }

    &__types {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;

        margin-top: 0.25rem;

        &__type {
            width: fit-content;

            padding: 0.375rem 0.75rem;

            font-size: 0.875rem;
            color: v.$grayish-black;

            border-radius: 9999px;

            background-color: v.$very-light-gray;
        }
    }
}
</style>
