<script setup lang="ts">
import SearchGymsTab from '@/components/Search/SearchGymsTab.vue';
import SearchPostsTab from '@/components/Search/SearchPostsTab.vue';
import SearchRoutesTab from '@/components/Search/SearchRoutesTab.vue';
import SearchTabs from '@/components/Search/SearchTabs.vue';
import SearchUsersTab from '@/components/Search/SearchUsersTab.vue';
import usePageTitle from '@/composables/usePageTitle';
import RouteType, { type TRouteType } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import {
    Mountains2Outlined,
    Route1Outlined,
    SlidersHorizontalSquare2Outlined,
    User4Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

usePageTitle(`${route.query.q ? `${route.query.q} - ` : ''}Recherche`);

// Tabs
const DEFAULT_TAB = 'all';

const currentTab = computed(() =>
    typeof route.query.tab === 'string' && route.query.tab in dataStore
        ? route.query.tab
        : DEFAULT_TAB
);

const isAllTab = computed(() => currentTab.value === 'all');

// Filters
const routesTypes = ref<'both' | TRouteType>('both');
</script>

<template>
    <main class="search__content">
        <SearchTabs :current-tab="currentTab" />

        <SearchUsersTab v-if="isAllTab || currentTab === 'users'" :pre-display="isAllTab" />
        <SearchRoutesTab
            v-if="isAllTab || currentTab === 'routes'"
            :pre-display="isAllTab"
            :types="routesTypes"
        />
        <SearchGymsTab
            v-if="isAllTab || currentTab === 'gyms'"
            :pre-display="isAllTab"
            :types="routesTypes"
        />
        <SearchPostsTab v-if="isAllTab || currentTab === 'posts'" :pre-display="isAllTab" />
    </main>

    <div class="search__filters">
        <div
            v-if="currentTab !== 'routes' && currentTab !== 'gyms'"
            class="search__filters__category"
        >
            <h3 class="search__filters__title">
                <Lineicons :icon="User4Outlined" class="search__filters__title__icon" />
                Personnes
            </h3>
            <div class="search__filters__filter">
                <label for="everyone" class="search__filters__filter__label">Tout le monde</label>
                <input
                    id="everyone"
                    type="radio"
                    name="users"
                    class="search__filters__filter__input"
                    checked
                />
            </div>
            <div class="search__filters__filter">
                <label for="followed" class="search__filters__filter__label">
                    Personnes que vous suivez
                </label>
                <input
                    id="followed"
                    type="radio"
                    name="users"
                    class="search__filters__filter__input"
                />
            </div>
        </div>

        <div class="search__filters__category">
            <h3 class="search__filters__title">
                <Lineicons :icon="Route1Outlined" class="search__filters__title__icon" />
                Localisation
            </h3>
            <div class="search__filters__filter">
                <label for="everywhere" class="search__filters__filter__label">Partout</label>
                <input
                    id="everywhere"
                    type="radio"
                    name="distance"
                    class="search__filters__filter__input"
                    checked
                />
            </div>
            <div class="search__filters__filter">
                <label for="near" class="search__filters__filter__label">Proche de moi</label>
                <input
                    id="near"
                    type="radio"
                    name="distance"
                    class="search__filters__filter__input"
                />
            </div>
        </div>

        <div v-if="currentTab !== 'gyms'" class="search__filters__category">
            <h3 class="search__filters__title">
                <Lineicons :icon="Mountains2Outlined" class="search__filters__title__icon" />
                Niveau
            </h3>
            <div class="search__filters__filter">
                <label for="all" class="search__filters__filter__label">Tous</label>
                <input
                    id="all"
                    type="radio"
                    name="level"
                    class="search__filters__filter__input"
                    checked
                />
            </div>
            <div class="search__filters__filter">
                <label for="like" class="search__filters__filter__label">Similaire au mien</label>
                <input id="like" type="radio" name="level" class="search__filters__filter__input" />
            </div>
        </div>

        <div
            v-if="currentTab !== 'users' && currentTab !== 'posts'"
            class="search__filters__category"
        >
            <h3 class="search__filters__title">
                <Lineicons
                    :icon="SlidersHorizontalSquare2Outlined"
                    class="search__filters__title__icon"
                />
                Disciplines
            </h3>
            <div class="search__filters__filter">
                <label for="both" class="search__filters__filter__label">Les deux</label>
                <input
                    id="both"
                    type="radio"
                    class="search__filters__filter__input"
                    :checked="routesTypes === 'both'"
                    @change="routesTypes = 'both'"
                />
            </div>
            <div class="search__filters__filter">
                <label for="route" class="search__filters__filter__label">Voie</label>
                <input
                    id="route"
                    type="radio"
                    class="search__filters__filter__input"
                    :checked="routesTypes === RouteType.Route"
                    @change="routesTypes = RouteType.Route"
                />
            </div>
            <div class="search__filters__filter">
                <label for="boulder" class="search__filters__filter__label">Bloc</label>
                <input
                    id="boulder"
                    type="radio"
                    class="search__filters__filter__input"
                    :checked="routesTypes === RouteType.Boulder"
                    @change="routesTypes = RouteType.Boulder"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search {
    &__content {
        &__divider {
            margin: 0.5rem 0;

            border: none;
            border-top: 1px solid v.$light-gray;
        }
    }

    &__filters {
        height: fit-content;

        position: sticky;
        top: calc(v.$header-height + v.$top-gap);

        @extend %default-box;

        padding: 1.375rem 1.5rem;

        display: flex;
        gap: 1.125rem;
        flex-direction: column;

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
}
</style>
