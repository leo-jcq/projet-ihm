<script setup lang="ts">
import { DEFAULT_TAB, SEARCH_TABS } from '@/constants/searchTabs';
import router from '@/router';
import { useRoute } from 'vue-router';

defineProps<{ currentTab: string }>();

const route = useRoute();

function changeTab(newTab: string) {
    router.push(`/search?q=${route.query.q}&tab=${newTab}`);
}
</script>

<template>
    <div class="search-tabs">
        <button
            v-for="tab in SEARCH_TABS"
            :key="tab.name"
            class="search-tabs__tab"
            :class="{ 'search-tabs__tab--active': currentTab === tab.name }"
            :title="`Voir${tab.name !== DEFAULT_TAB ? ' les' : ''} ${tab.display.toLowerCase()}`"
            @click="changeTab(tab.name)"
        >
            {{ tab.display }}
        </button>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.search-tabs {
    display: flex;
    gap: 1.375rem;
    align-items: center;

    margin-bottom: 1rem;

    &__tab {
        border: none;

        background-color: transparent;

        font-size: 1.125rem;
        font-weight: 500;

        position: relative;

        cursor: pointer;

        &::after {
            content: '';

            @include m.size(100%, 0);

            position: absolute;
            bottom: -3px;
            left: 0;

            background-color: v.$accent;

            border-radius: 9999px;

            transition: height 0.3s ease;
        }

        &--active,
        &:hover {
            &::after {
                height: 3px;
            }
        }
    }
}
</style>
