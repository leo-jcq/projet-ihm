<script setup lang="ts">
import MatchCard from '@/components/Matchs/MatchCard.vue';
import MatchRegisterForm from '@/components/Matchs/MatchRegisterForm.vue';
import MatchsActions from '@/components/Matchs/MatchsActions.vue';
import MatchsFilters from '@/components/Matchs/MatchsFilters.vue';
import SendMessageMatch from '@/components/Matchs/SendMessageMatch.vue';
import useLocalStorageRef from '@/composables/useLocalStorageRef';
import useOpen from '@/composables/useOpen';
import usePageTitle from '@/composables/usePageTitle';
import { DEFAULT_DISTANCE, DISTANCES } from '@/constants/matchs';
import router from '@/router';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { getRandomInt } from '@/utils/random';
import { Funnel1Outlined, UserMultiple4Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';

usePageTitle('Matchs');

const { isOpen, toggle } = useOpen();

// Register
const hasRegister = useLocalStorageRef('hasRegisterMatch', false);

// Distance
const rawDistance = ref(DEFAULT_DISTANCE);

function handleInput(e: Event) {
    const parsed = parseInt((e.target as HTMLInputElement).value);

    rawDistance.value =
        isNaN(parsed) || parsed < 0 || parsed >= DISTANCES.length ? DEFAULT_DISTANCE : parsed;
}

const distance = computed(() => DISTANCES[rawDistance.value]!);

// Matchs
const passedIds = ref<number[]>([userStore.user.id]);
const liked = ref(false);

const usersToMatch = computed(() =>
    dataStore.users.filter((u) => passedIds.value.indexOf(u.id) === -1)
);

const NB_USERS_TO_MATCHS = usersToMatch.value.length;

const user = computed(() => {
    // Forcer nouvel utilisateur lorsque la distance change
    rawDistance.value;

    return usersToMatch.value[getRandomInt(0, usersToMatch.value.length - 1)];
});

function nextUser() {
    if (!user.value) return;

    window.scrollTo({ top: 0 });
    passedIds.value.push(user.value.id);
}

function handleAction(action: 'no' | 'like') {
    if (action === 'like') {
        liked.value = true;
    } else {
        nextUser();
    }
}

function handleSendMessage() {
    liked.value = false;
    nextUser();
}

function handleCancelSendMessage() {
    liked.value = false;
}
</script>

<template>
    <main class="matchs">
        <template v-if="hasRegister">
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

            <Transition name="matchs__filters">
                <MatchsFilters
                    v-if="isOpen"
                    :raw-distance="rawDistance"
                    :distance="distance"
                    @input="handleInput"
                />
            </Transition>

            <template v-if="user">
                <MatchCard :user="user" :max-distance="distance" />

                <MatchsActions @action="handleAction" />

                <span class="matchs__indicator">
                    {{ passedIds.length }}/{{ NB_USERS_TO_MATCHS }} grimpeurs
                </span>

                <SendMessageMatch
                    v-if="liked"
                    :user="user"
                    @send="handleSendMessage"
                    @cancel="handleCancelSendMessage"
                />
            </template>
            <div v-else class="matchs__empty">
                <Lineicons :icon="UserMultiple4Outlined" class="matchs__empty__icon" />
                <p class="matchs__empty__text">
                    Plus de grimpeurs pour le moment <br />
                    Revenez plus tard ou ajustez vos filtres
                </p>
                <button class="matchs__empty__reset" @click="passedIds = [userStore.user.id]">
                    Recommencer
                </button>
            </div>
        </template>
        <MatchRegisterForm v-else @accept="hasRegister = true" @reject="router.push('/')" />
    </main>
</template>

<style lang="scss">
@use '@/scss/breakpoints' as bp;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.matchs {
    grid-column: 2/3;

    @media screen and (max-width: bp.$extra-large) {
        grid-column: 1/3;
    }

    &__top {
        @extend %flex-between;

        margin-bottom: 1.375rem;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 500;
    }

    &__sub-title {
        font-size: 1rem;
        font-weight: 400;
        color: v.$very-dark-gray;
    }

    &__open-filters {
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

    &__filters {
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

    &__indicator {
        width: 100%;

        display: inline-block;

        margin-top: 1.5rem;

        font-size: 0.875rem;
        text-align: center;
        color: v.$dark-gray;
    }

    &__empty {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;

        &__icon {
            @include m.size(4rem);

            color: v.$dark-gray;
        }

        &__text {
            text-align: center;
            line-height: 2;
            color: v.$grayish-black;
        }

        &__reset {
            font-size: 0.875rem;
            color: v.$white;

            background-image: v.$main-gradient;

            padding: 0.5rem 1.5rem;

            cursor: pointer;

            border: none;
            border-radius: 9999px;

            transition: scale 0.3s ease;

            @include m.hover() {
                background-image: v.$main-gradient-lighten;
            }

            &:active {
                scale: 0.9;
            }
        }
    }
}
</style>
