<script setup lang="ts">
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import GymBox from '../Gyms/GymBox.vue';

const props = defineProps<{ preDisplay: boolean }>();

const route = useRoute();

const gyms = computed(() => {
    const query = route.query.q ? String(route.query.q).toLowerCase() : '';

    const gyms = dataStore.gyms.filter(
        (gym) => gym.name.toLowerCase().includes(query) || gym.location.toLowerCase().includes(query)
    );

    return props.preDisplay ? gyms.slice(0, 3) : gyms;
});
</script>

<template>
    <div v-if="gyms.length > 0 || !preDisplay" class="search-gyms-tab">
        <h3 v-if="preDisplay" class="search-gyms-tab__title">Salles</h3>

        <ul class="search-gyms-tab__list">
            <li v-for="gym in gyms" :key="gym.id" class="search-gyms-tab__list__gym">
                <GymBox :gym="gym" link show-details />
            </li>
            <li v-if="gyms.length === 0" class="search-gyms-tab__list__empty">
                Aucune salle trouvée.
            </li>
        </ul>

        <hr v-if="preDisplay" class="search__content__divider" />
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-gyms-tab {
    &__title {
        margin-bottom: 1em;

        font-size: 1rem;
        font-weight: 500;
    }

    &__list {
        list-style: none;

        &__gym {
            margin-bottom: 0.8rem;
        }

        &__empty {
            color: v.$grayish-black;
        }
    }
}
</style>
