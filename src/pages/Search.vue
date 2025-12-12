<script setup lang="ts">
import SearchGymsTab from '@/components/Search/SearchGymsTab.vue';
import SearchPostsTab from '@/components/Search/SearchPostsTab.vue';
import SearchRoutesTab from '@/components/Search/SearchRoutesTab.vue';
import SearchTabs from '@/components/Search/SearchTabs.vue';
import SearchUsersTab from '@/components/Search/SearchUsersTab.vue';
import usePageTitle from '@/composables/usePageTitle';
import dataStore from '@/stores/data';
import { Route1Outlined, User4Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

usePageTitle(`${route.query.q ? `${route.query.q} - ` : ''}Recherche`);

const DEFAULT_TAB = 'all';

const currentTab = computed(() =>
    typeof route.query.tab === 'string' && route.query.tab in dataStore
        ? route.query.tab
        : DEFAULT_TAB
);

const isAllTab = computed(() => currentTab.value === 'all');
</script>

<template>
    <main class="search__content">
        <SearchTabs :current-tab="currentTab" />

        <SearchUsersTab v-if="isAllTab || currentTab === 'users'" :pre-display="isAllTab" />
        <SearchRoutesTab v-if="isAllTab || currentTab === 'routes'" :pre-display="isAllTab" />
        <SearchGymsTab v-if="isAllTab || currentTab === 'gyms'" :pre-display="isAllTab" />
        <SearchPostsTab v-if="isAllTab || currentTab === 'posts'" :pre-display="isAllTab" />
    </main>

    <div class="search__filters">
        <div class="search__filters__category">
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
                <label for="near" class="search__filters__filter__label">Proche de vous</label>
                <input
                    id="near"
                    type="radio"
                    name="distance"
                    class="search__filters__filter__input"
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
