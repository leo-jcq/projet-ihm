<script setup lang="ts" generic="T">
import useOpen from '@/composables/useOpen';
import { computed, ref, useTemplateRef, type Component } from 'vue';

const props = defineProps<{
    options: T[];
    selected: T | null | undefined;
    id: string;
    placeholder: string;
    searchKeys?: (keyof T)[];
    itemComponent?: Component<{ item: T }>;
}>();

const emits = defineEmits<{
    select: [T];
}>();

const containerRef = useTemplateRef('search-select');
const { isOpen, open, close } = useOpen(containerRef);
const searchQuery = ref('');

const filteredOptions = computed<T[]>(() => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) return props.options;

    if (props.searchKeys && props.searchKeys.length > 0) {
        return props.options.filter((option) =>
            props.searchKeys!.some((key) => {
                const value = option[key];
                return String(value).toLowerCase().includes(query);
            })
        );
    }

    return props.options.filter((option) => String(option).toLowerCase().includes(query));
});

function onSelect(option: T) {
    emits('select', option);
    close();
    searchQuery.value = '';
}
</script>

<template>
    <div ref="search-select" class="search-select">
        <input
            :id="id"
            v-model="searchQuery"
            type="text"
            class="search-select__input"
            :placeholder="placeholder"
            @click="open"
        />

        <Transition name="search-select__options">
            <ul v-if="isOpen" class="search-select__options">
                <li
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                    class="search-select__options__option"
                    @click="onSelect(option)"
                >
                    <component :is="itemComponent" v-if="itemComponent" :item="option" />
                    <span v-else>{{ String(option) }}</span>
                </li>
                <li v-if="filteredOptions.length === 0" name="search-select__options__no-result">
                    Aucun résultat trouvé
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-select {
    width: 100%;

    position: relative;

    &__input {
        width: 100%;

        padding: 1rem 1.5rem;

        border: 1px solid v.$light-gray;
        border-radius: 0.5rem;
        outline-color: v.$accent;

        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__options {
        width: 100%;
        max-height: 20rem;

        overflow: auto;

        position: absolute;
        z-index: 50;
        top: calc(100% + 0.5rem);
        left: 0;
        right: 0;

        background-color: v.$white;

        border: 1px solid v.$light-gray;
        border-radius: 0.5rem;

        padding: 0.25rem;

        @extend %default-shadow;

        list-style: none;

        &-enter-active,
        &-leave-active {
            transition: opacity 0.3s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }

        &__option {
            padding: 0.25rem;

            cursor: pointer;
        }
    }
}
</style>
