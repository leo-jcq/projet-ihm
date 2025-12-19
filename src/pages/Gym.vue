<script setup lang="ts">
import GymRates from '@/components/Gyms/GymRates.vue';
import GymSide from '@/components/Gyms/GymSide.vue';
import ImageCaroussel from '@/components/ImageCaroussel.vue';
import usePageTitle from '@/composables/usePageTitle';
import { ClimStyleToString } from '@/enums/ClimbStyle';
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
    <main class="gym">
        <div class="gym__top">
            <img :src="gym!.logo" :alt="gym!.name" class="gym__logo" />

            <div class="gym__top__text">
                <h2 class="gym__name">{{ gym!.name }}</h2>

                <div class="gym__route-types">
                    <span
                        v-for="type in gym!.routeTypes"
                        :key="type"
                        class="gym__route-types__type"
                    >
                        {{ RouteTypeToString[type] }}
                    </span>
                    <span v-for="style in gym!.styles" :key="style" class="gym__route-types__type">
                        {{ ClimStyleToString[style] }}
                    </span>
                </div>

                <span class="gym__adress">{{ gym!.location }}</span>
            </div>
        </div>

        <!-- Images -->
        <h3 class="gym__sub-title">Dernière images</h3>
        <ImageCaroussel :images="gym!.images" />

        <!-- Avis -->
        <GymRates :gym="gym!" />
    </main>

    <!-- Side -->
    <GymSide :gym="gym!" />
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym {
    grid-template-columns: 2/3;

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
        @include m.rounded(7rem);

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
}
</style>
