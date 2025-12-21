<script setup lang="ts">
import RouteType, { type TRouteType } from '@/enums/RouteType';
import {
    Mountains2Outlined,
    Route1Outlined,
    SlidersHorizontalSquare2Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';

withDefaults(
    defineProps<{ currentTab: string; routesTypes: 'both' | TRouteType; mobile?: boolean }>(),
    {
        mobile: false
    }
);

defineEmits<{ routeTypeChange: ['both' | TRouteType] }>();
</script>

<template>
    <div class="search-filters">
        <div class="search-filters__category">
            <h3 class="search-filters__title">
                <Lineicons :icon="Route1Outlined" class="search-filters__title__icon" />
                Localisation
            </h3>
            <div class="search-filters__filter">
                <label for="everywhere" class="search-filters__filter__label">Partout</label>
                <input
                    id="everywhere"
                    type="radio"
                    name="distance"
                    class="search-filters__filter__input"
                    checked
                />
            </div>
            <div class="search-filters__filter">
                <label for="near" class="search-filters__filter__label">Proche de moi</label>
                <input
                    id="near"
                    type="radio"
                    name="distance"
                    class="search-filters__filter__input"
                />
            </div>
        </div>

        <div v-if="currentTab !== 'gyms'" class="search-filters__category">
            <h3 class="search-filters__title">
                <Lineicons :icon="Mountains2Outlined" class="search-filters__title__icon" />
                Niveau
            </h3>
            <div class="search-filters__filter">
                <label for="all" class="search-filters__filter__label">Tous</label>
                <input
                    id="all"
                    type="radio"
                    name="level"
                    class="search-filters__filter__input"
                    checked
                />
            </div>
            <div class="search-filters__filter">
                <label for="like" class="search-filters__filter__label">Similaire au mien</label>
                <input id="like" type="radio" name="level" class="search-filters__filter__input" />
            </div>
        </div>

        <div
            v-if="currentTab !== 'users' && currentTab !== 'posts'"
            class="search-filters__category"
        >
            <h3 class="search-filters__title">
                <Lineicons
                    :icon="SlidersHorizontalSquare2Outlined"
                    class="search-filters__title__icon"
                />
                Disciplines
            </h3>
            <div class="search-filters__filter">
                <label for="both" class="search-filters__filter__label">Les deux</label>
                <input
                    id="both"
                    type="radio"
                    class="search-filters__filter__input"
                    :checked="routesTypes === 'both'"
                    @change="$emit('routeTypeChange', 'both')"
                />
            </div>
            <div class="search-filters__filter">
                <label for="route" class="search-filters__filter__label">Voie</label>
                <input
                    id="route"
                    type="radio"
                    class="search-filters__filter__input"
                    :checked="routesTypes === RouteType.Route"
                    @change="$emit('routeTypeChange', RouteType.Route)"
                />
            </div>
            <div class="search-filters__filter">
                <label for="boulder" class="search-filters__filter__label">Bloc</label>
                <input
                    id="boulder"
                    type="radio"
                    class="search-filters__filter__input"
                    :checked="routesTypes === RouteType.Boulder"
                    @change="$emit('routeTypeChange', RouteType.Boulder)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-filters {
    height: fit-content;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    @extend %default-box;

    padding: 1.375rem 1.5rem;

    display: flex;
    gap: 1.125rem;
    flex-direction: column;

    grid-column: 3/4;

    @media screen and (max-width: bp.$extra-large) {
        grid-column: 2/3;
    }

    @media screen and (max-width: bp.$medium) {
        display: none;
    }

    &--mobile {
        display: none;

        position: static;

        @media screen and (max-width: bp.$medium) {
            display: flex;
        }
    }

    &__title {
        font-size: 1rem;
        font-weight: 400;

        margin-bottom: 0.75rem;

        display: flex;
        gap: 0.5rem;
        align-items: center;

        &__icon {
            color: v.$accent;
        }
    }

    &__filter {
        @extend %flex-between;

        &__label {
            font-size: 0.875rem;
        }

        &__input {
            @extend %custom-checkbox;
        }
    }
}
</style>
