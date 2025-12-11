<script setup lang="ts">
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import RouteBox from '../Routes/RouteBox.vue';

const props = defineProps<{ preDisplay: boolean }>();

const route = useRoute();

const routes = computed(() => {
    const query = route.query.q ? String(route.query.q) : '';

    const routes = dataStore.routes.filter(
        (r) => r.name.includes(query) || r.location.includes(query)
    );

    return props.preDisplay ? routes.slice(0, 3) : routes;
});
</script>

<template>
    <div v-if="routes.length > 0 || !preDisplay" class="search-routes-tab">
        <h3 v-if="preDisplay" class="search-routes-tab__title">Voies</h3>

        <ul class="search-routes-tab__list">
            <li v-for="r in routes" :key="r.id" class="search-routes-tab__list__route">
                <RouteBox :route="r" />
            </li>
            <li v-if="routes.length === 0" class="search-routes-tab__list__empty">
                Aucune voie trouvée.
            </li>
        </ul>
    </div>

    <hr v-if="preDisplay" class="search__content__divider" />
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-routes-tab {
    &__title {
        margin-bottom: 1em;

        font-size: 1rem;
        font-weight: 500;
    }

    &__list {
        list-style: none;

        &__route {
            margin-bottom: 0.8rem;
        }

        &__empty {
            color: v.$grayish-black;
        }
    }
}
</style>
