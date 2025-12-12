<script setup lang="ts">
import { DISTANCES } from '@/constants/matchs';
import CustomRange from '../CustomRange.vue';

defineProps<{ rawDistance: number; distance: number }>();

const emit = defineEmits<{
    input: [Event];
}>();

function handleInput(e: Event) {
    emit('input', e);
}
</script>

<template>
    <div class="matchs-filters">
        <h4 class="matchs-filters__title">Filtres</h4>

        <div class="matchs-filters__content">
            <div class="matchs-filters__filter">
                <h5 class="matchs-filters__filter__title">Niveau</h5>

                <div class="matchs-filters__filter__container">
                    <label for="everyone" class="matchs-filters__filter__label">
                        Tous les niveaux
                    </label>
                    <input
                        id="everyone"
                        type="radio"
                        name="level"
                        class="matchs-filters__filter__checkbox"
                        checked
                    />
                </div>

                <div class="matchs-filters__filter__container">
                    <label for="near" class="matchs-filters__filter__label"> Proche du mien </label>
                    <input
                        id="near"
                        type="radio"
                        name="level"
                        class="matchs-filters__filter__checkbox"
                    />
                </div>
            </div>

            <div class="matchs-filters__filter">
                <label for="distance" class="matchs-filters__filter__label">
                    Distance
                    <span class="matchs-filters__filter__value">{{ distance }}km</span>
                </label>

                <CustomRange
                    id="distance"
                    :value="rawDistance"
                    min="0"
                    :max="DISTANCES.length - 1"
                    @input="handleInput"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.matchs-filters {
    margin-bottom: 1.375rem;
    padding: 1.5rem;

    background-color: v.$white;

    @extend %default-border;
    border-radius: 0.75rem;

    &__title {
        font-size: 1.125rem;
        font-weight: 400;

        margin-bottom: 0.625rem;
    }

    &__content {
        display: grid;
        gap: 1rem;
        grid-template-columns: 50% 50%;
    }

    &__filter {
        &__top {
            @extend %flex-between;

            margin-bottom: 0.375rem;
        }

        &__title,
        & > &__label {
            font-size: 1rem;
            font-weight: 400;
            color: v.$very-dark-gray;
        }

        &__title {
            margin-bottom: 0.375rem;
        }

        &__value {
            color: v.$black;
            font-size: 0.875rem;
        }

        &__container {
            @extend %flex-between;

            margin-bottom: 0.25rem;
        }

        &__label {
            font-size: 0.875rem;
        }

        & > &__label {
            @extend %flex-between;

            margin-bottom: 1rem;
        }

        &__checkbox {
            @extend %custom-checkbox;
        }

        &__range {
            -webkit-appearance: none;
            appearance: none;

            @include m.size(100%, 0.5rem);

            border-radius: 9999px;
            background: v.$light-gray;

            outline: none;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;

                @include m.size(1.5rem);

                border-radius: 50%;

                background-color: v.$main-gradient-end;

                cursor: pointer;
            }

            &::-moz-range-thumb {
                @include m.size(1.5rem);

                border-radius: 50%;

                background-color: v.$main-gradient-end;

                cursor: pointer;
            }
        }
    }
}
</style>
