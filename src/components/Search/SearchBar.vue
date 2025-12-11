<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import router from '@/router';
import { Search2Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const inputRef = useTemplateRef('search-input');
const query = ref('');
const { isOpen, open, close } = useOpen();

function handleSearch() {
    if (query.value === '') return;

    router.push(`/search?q=${query.value}${route.query.tab ? `&tab=${route.query.tab}` : ''}`);
    inputRef.value?.blur();
}

watch(
    () => route.query.q,
    (newValue) => {
        query.value = (newValue as string) ?? '';
    }
);
</script>

<template>
    <form class="search-bar" @submit.prevent="handleSearch">
        <div class="search-bar__wrapper">
            <input
                ref="search-input"
                v-model="query"
                type="text"
                class="search-bar__input"
                placeholder="Rechercher des grimpeurs, des voies..."
                @focus="open()"
                @blur="close()"
            />
            <Lineicons :icon="Search2Outlined" class="search-bar__icon" />

            <Transition name="search-bar__tooltip">
                <div v-if="isOpen" class="search-bar__tooltip">
                    Appuyez sur Entrée pour lancer la recherche
                </div>
            </Transition>
        </div>
    </form>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-bar {
    position: relative;

    &__wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    &__input {
        @include m.size(450px, 42px);

        font-size: 1rem;

        padding: 0 1rem 0 2.5rem;

        border: 1px solid v.$light-gray;
        border-radius: 9999px;
        outline-color: v.$accent;

        background-color: v.$very-light-gray;

        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__icon {
        height: 1.25rem;

        color: v.$dark-gray;

        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
    }

    &__tooltip {
        $opacity: 0.8;

        position: absolute;
        z-index: 10;
        bottom: -2.5rem;
        left: 0;

        opacity: $opacity;

        pointer-events: none;

        background-color: v.$white;

        @extend %default-shadow;

        padding: 0.5rem 1rem;

        border: 1px solid v.$light-gray;
        border-radius: 0.25rem;

        font-size: 0.875rem;
        white-space: nowrap;

        &-enter-active,
        &-leave-active {
            transition-property: opacity, transform;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }

        &-enter-to,
        &-leave-from {
            opacity: $opacity;
            transform: translateY(0) scale(1);
        }
    }
}
</style>
