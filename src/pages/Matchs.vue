<script setup lang="ts">
import MatchCard from '@/components/Matchs/MatchCard.vue';
import MatchsActions from '@/components/Matchs/MatchsActions.vue';
import MatchsFilters from '@/components/Matchs/MatchsFilters.vue';
import useOpen from '@/composables/useOpen';
import { DEFAULT_DISTANCE, DISTANCES } from '@/constants/matchs';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { getRandomInt } from '@/utils/random';
import { Funnel1Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';

const { isOpen, toggle } = useOpen();

// Distance
const rawDistance = ref(DEFAULT_DISTANCE);

function handleInput(e: Event) {
    const parsed = parseInt((e.target as HTMLInputElement).value);

    rawDistance.value =
        isNaN(parsed) || parsed < 0 || parsed >= DISTANCES.length ? DEFAULT_DISTANCE : parsed;
}

const distance = computed(() => DISTANCES[rawDistance.value]!);

const otherUsers = computed(() => dataStore.users.filter((u) => u.id !== userStore.user!.id));

// Matchs
const user = computed(() => {
    // Forcer nouvel utilisateur lorsque la distance change
    rawDistance.value;

    return otherUsers.value[getRandomInt(0, otherUsers.value.length - 1)]!;
});
</script>

<template>
    <div class="matchs">
        <div class="matchs__top">
            <div class="matchs__top__right">
                <h2 class="matchs__title">Trouvez votre partenaire</h2>
                <h3 class="matchs__sub-title">Grimpeurs compatibles près de chez vous</h3>
            </div>

            <button
                class="matchs__open-filters"
                :title="`${isOpen ? 'Fermer' : 'Ouvrir'} les filtres`"
                @click="toggle"
            >
                <Lineicons :icon="Funnel1Outlined" />
            </button>
        </div>

        <MatchsFilters
            v-if="isOpen"
            :raw-distance="rawDistance"
            :distance="distance"
            @input="handleInput"
        />

        <MatchCard :user="user" :max-distance="distance" />

        <MatchsActions />
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.matchs {
    grid-column: 2/3;

    &__top {
        @extend %flex-between;

        margin-bottom: 1.375rem;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 500;
    }

    &__sub-title {
        font-size: v.$very-dark-gray;
        font-weight: 400;
    }

    &__open-filters {
        @extend %flex-center;

        padding: 0.75rem;

        background-color: v.$white;

        cursor: pointer;

        @extend %default-border;
        border-radius: 0.875rem;

        transition: border-color 0.3s ease;

        &:hover {
            border-color: v.$accent;
        }
    }
}
</style>
