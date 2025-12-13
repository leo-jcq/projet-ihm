<script setup lang="ts">
import { AvailabilityToString } from '@/enums/Availability';
import { RouteTypeToString } from '@/enums/RouteType';
import type { User } from '@/types/model';
import { getRandomNumber } from '@/utils/random';
import {
    Buildings1Outlined,
    CalendarDaysOutlined,
    MapMarker5Outlined,
    Mountains2Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';
import GymBox from '../Gyms/GymBox.vue';

const props = defineProps<{ user: User; maxDistance: number }>();

const distance = computed(() => getRandomNumber(0, props.maxDistance));
</script>

<template>
    <div class="match-card">
        <div class="match-card__picture">
            <img :src="user.avatar" :alt="user.name" class="match-card__picture__img" />

            <div class="match-card__picture__distance">
                <Lineicons :icon="MapMarker5Outlined" class="match-card__picture__distance__icon" />
                {{ distance }}km
            </div>

            <div class="match-card__picture__bottom">
                {{ user.name }}, {{ user.age }}
            </div>
        </div>

        <div class="match-card__infos">
            <p class="match-card__infos__description">{{ user.description }}</p>
            <template v-if="user.styles.length > 0">
                <span class="match-card__infos__title">
                    <Lineicons :icon="Mountains2Outlined" />
                    Styles d'escalade
                </span>
                <div class="match-card__infos__group">
                    <div v-for="style in user.styles" :key="style" class="match-card__infos__style">
                        {{ RouteTypeToString[style] }}
                    </div>
                </div>
            </template>
            <template v-if="user.gymsIds.length > 0">
                <span class="match-card__infos__title">
                    <Lineicons :icon="Buildings1Outlined" />
                    Salles favorites
                </span>
                <div class="match-card__infos__group">
                    <GymBox v-for="gymId in user.gymsIds" :id="gymId" :key="gymId" />
                </div>
            </template>
            <template v-if="user.availabilities.length > 0">
                <span class="match-card__infos__title">
                    <Lineicons :icon="CalendarDaysOutlined" />
                    Disponibilités
                </span>
                <div class="match-card__infos__group">
                    <div
                        v-for="availability in user.availabilities"
                        :key="availability"
                        class="match-card__infos__availability"
                    >
                        {{ AvailabilityToString[availability] }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.match-card {
    @extend %bigger-shadow;

    background-color: v.$white;

    border-radius: 0.625rem;

    overflow: hidden;

    &__picture {
        width: 100%;
        aspect-ratio: 16/10;

        position: relative;

        &__img {
            @include m.size(100%);

            object-fit: cover;

            position: absolute;

            user-select: none;
            pointer-events: none;
        }

        &__distance {
            position: absolute;
            top: 1rem;
            left: 1.625rem;

            display: flex;
            gap: 0.5rem;
            align-items: center;

            padding: 0.5rem 0.75rem;

            border-radius: 9999px;

            background-color: v.$white;

            font-size: 0.875rem;

            &__icon {
                color: v.$accent;
            }
        }

        &__bottom {
            position: absolute;
            bottom: 1rem;
            left: 1.625rem;

            font-size: 1.5rem;
            color: v.$white;
        }
    }

    &__infos {
        padding: 1.5rem;

        &__description {
            margin-bottom: 1rem;
        }

        &__title {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            margin-bottom: 0.5rem;

            color: v.$very-dark-gray;
        }

        &__group {
            margin-bottom: 1rem;

            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        &__style,
        &__availability {
            width: fit-content;

            font-size: 0.875rem;

            padding: 0.375rem 0.75rem;
        }

        &__style {
            color: v.$grayish-black;

            border-radius: 9999px;

            background-color: v.$very-light-gray;
        }

        &__availability {
            color: v.$blue;

            border-radius: 0.625rem;

            background-color: v.$light-blue;
        }
    }
}
</style>
