<script setup lang="ts">
import GymReviews from '@/components/Gyms/GymReviews.vue';
import GymSide from '@/components/Gyms/GymSide.vue';
import ImageCaroussel from '@/components/ImageCaroussel.vue';
import usePageTitle from '@/composables/usePageTitle';
import { ClimbStyleToString } from '@/enums/ClimbStyle';
import { RouteTypeToString } from '@/enums/RouteType';
import router from '@/router';
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const gym = computed(() => {
    return dataStore.gyms.find((g) => g.id.toString() === route.params.id);
});

if (!gym.value) {
    router.push('/not-found');
}

usePageTitle(gym.value!.name);
</script>

<template>
    <!-- Main -->
    <main v-if="gym" class="gym">
        <div class="gym__top">
            <img :src="gym.logo" :alt="gym.name" class="gym__logo" />

            <div class="gym__top__text">
                <h2 class="gym__name">{{ gym.name }}</h2>

                <div class="gym__route-types">
                    <span v-for="type in gym.routeTypes" :key="type" class="gym__route-types__type">
                        {{ RouteTypeToString[type] }}
                    </span>
                    <span v-for="style in gym.styles" :key="style" class="gym__route-types__type">
                        {{ ClimbStyleToString[style] }}
                    </span>
                </div>

                <span class="gym__adress">{{ gym.location }}</span>
            </div>
        </div>

        <!-- Side mobile -->
        <GymSide v-if="gym" :gym="gym" class="gym__side--mobile" />

        <!-- Images -->
        <h3 class="gym__sub-title">Dernières images</h3>
        <ImageCaroussel :images="gym.images" />

        <!-- Avis -->
        <GymReviews :gym="gym" />
    </main>

    <!-- Side -->
    <GymSide v-if="gym" :gym="gym" class="gym__side--desktop" />
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym {
    grid-column: 2/3;

    @media screen and (max-width: bp.$extra-large) {
        grid-column: 1/2;
    }

    @media screen and (max-width: bp.$medium) {
        grid-column: 1/3;
    }

    &__top {
        @extend %default-box;

        padding: 1.5rem;

        display: flex;
        gap: 2rem;

        &__text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

    &__logo {
        @include m.rounded(6.25rem);

        border: 2px solid v.$accent;

        object-fit: contain;
    }

    &__name {
        font-size: 1.5rem;
        font-weight: 500;
    }

    &__route-types {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;

        &__type {
            width: fit-content;

            padding: 0.375rem 0.75rem;

            font-size: 0.875rem;
            color: v.$grayish-black;

            border-radius: 9999px;

            background-color: v.$very-light-gray;
        }
    }

    &__adress {
        color: v.$dark-gray;
    }

    &__sub-title {
        font-size: 1.25rem;
        font-weight: 500;

        display: flex;
        gap: 0.5rem;
        align-items: baseline;

        margin: 1.5rem 0 0.625rem;
    }

    &__side {
        &--mobile {
            margin-top: 1.5rem;

            @media screen and (min-width: bp.$medium) {
                display: none;
            }
        }

        &--desktop {
            @media screen and (max-width: bp.$medium) {
                display: none;
            }
        }
    }
}
</style>
