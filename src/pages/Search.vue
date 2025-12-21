<script setup lang="ts">
import SearchBar from '@/components/Search/SearchBar.vue';
import SearchFilters from '@/components/Search/SearchFilters.vue';
import SearchGymsTab from '@/components/Search/SearchGymsTab.vue';
import SearchPostsTab from '@/components/Search/SearchPostsTab.vue';
import SearchRoutesTab from '@/components/Search/SearchRoutesTab.vue';
import SearchTabs from '@/components/Search/SearchTabs.vue';
import SearchUsersTab from '@/components/Search/SearchUsersTab.vue';
import useOpen from '@/composables/useOpen';
import usePageTitle from '@/composables/usePageTitle';
import { type TRouteType } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import { Funnel1Outlined } from '@lineiconshq/free-icons';
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
const { isOpen, toggle } = useOpen();

const routesTypes = ref<'both' | TRouteType>('both');

function handleRouteTypeChange(newType: 'both' | TRouteType) {
    routesTypes.value = newType;
}
</script>

<template>
    <main class="search__content">
        <div class="search__content__top">
            <SearchBar class="search__content__top__bar" />

            <button class="search__content__top__open" title="Filtres" @click="toggle">
                <Lineicons :icon="Funnel1Outlined" />
            </button>
        </div>

        <Transition name="search__content__filters">
            <SearchFilters
                v-if="isOpen"
                :current-tab="currentTab"
                :routes-types="routesTypes"
                class="search__content__filters"
                @route-type-change="handleRouteTypeChange"
            />
        </Transition>

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

    <SearchFilters
        :current-tab="currentTab"
        :routes-types="routesTypes"
        @route-type-change="handleRouteTypeChange"
    />
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search {
    &__content {
        grid-column: 2/3;

        @media screen and (max-width: bp.$extra-large) {
            grid-column: 1/2;
        }

        @media screen and (max-width: bp.$medium) {
            grid-column: 1/3;
        }

        &__top {
            width: 100%;

            margin-bottom: 0.75rem;

            display: none;
            gap: 1rem;
            align-items: center;

            @media screen and (max-width: bp.$large) {
                display: flex;
            }

            &__bar {
                flex: 1;

                input {
                    width: 100%;
                }
            }

            &__open {
                @extend %flex-center;

                padding: 0.75rem;

                background-color: v.$white;

                cursor: pointer;

                @extend %default-border;
                border-radius: 0.875rem;

                transition: border-color 0.3s ease;

                @include m.hover() {
                    border-color: v.$accent;
                }
            }
        }

        &__filters {
            display: none;

            position: static;

            margin-bottom: 1.5rem;

            @media screen and (max-width: bp.$medium) {
                display: flex;
            }

            &-enter-active,
            &-leave-active {
                height: 154px;

                @include m.transition-group(0.2s, ease-in-out, color, opacity, height);
            }

            &-enter-from,
            &-leave-to {
                height: 0;

                opacity: 0;
            }
        }

        &__divider {
            margin: 0.5rem 0;

            border: none;
            border-top: 1px solid v.$light-gray;
        }
    }
}
</style>
