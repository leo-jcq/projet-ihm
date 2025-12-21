<script setup lang="ts" generic="T">
import useOpen from '@/composables/useOpen';
import { ChevronDownOutlined, XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, useTemplateRef } from 'vue';
import GlassBtn from './GlassBtn.vue';

const props = withDefaults(
    defineProps<{
        options: T[];
        selected: T | T[] | null | undefined;
        placeholder?: string;
        optionsBefore?: boolean;
    }>(),
    {
        placeholder: undefined,
        optionsBefore: false
    }
);

const emit = defineEmits<{
    select: [T];
    remove: [T];
}>();

const containerRef = useTemplateRef('custom-select');
const { isOpen, close, toggle } = useOpen(containerRef);

function onSelect(option: T) {
    if (!Array.isArray(props.selected)) {
        close();
    }

    emit('select', option);
}

const filterOptions = computed(() => {
    return Array.isArray(props.selected)
        ? props.options.filter((option) => !(props.selected as T[]).includes(option))
        : props.options;
});
</script>

<template>
    <div ref="custom-select" class="custom-select">
        <div
            class="custom-select__selected"
            :class="{
                'custom-select__selected--multiple': Array.isArray(selected),
                'custom-select__selected--open': isOpen
            }"
            @click="toggle"
        >
            <template v-if="Array.isArray(selected) ? selected.length > 0 : selected">
                <span v-if="!Array.isArray(selected)" class="custom-select__selected__single">
                    <slot :item="selected">{{ String(selected) }}</slot>
                </span>
                <div
                    v-for="(option, index) in selected"
                    v-else
                    :key="index"
                    class="custom-select__selected__multiple"
                >
                    <slot name="selected-item" :item="option">
                        <slot :item="option">{{ String(option) }}</slot>
                    </slot>
                    <GlassBtn
                        class="custom-select__selected__multiple__remove"
                        title="Retirer"
                        @click.stop="$emit('remove', option)"
                    >
                        <Lineicons
                            :icon="XmarkOutlined"
                            class="custom-select__selected__multiple__remove__icon"
                        />
                    </GlassBtn>
                </div>
            </template>
            <span v-else-if="placeholder" class="custom-select__placeholder">{{
                placeholder
            }}</span>

            <span class="custom-select__selected__indicator">
                <Lineicons :icon="ChevronDownOutlined" />
            </span>
        </div>

        <Transition name="custom-select__options">
            <ul
                v-if="isOpen"
                class="custom-select__options"
                :class="{ 'custom-select__options--before': optionsBefore }"
            >
                <li
                    v-for="(option, index) in filterOptions"
                    :key="index"
                    class="custom-select__options__option"
                    @click="onSelect(option)"
                >
                    <slot name="list-item" :item="option">
                        <slot :item="option">{{ String(option) }}</slot>
                    </slot>
                </li>
                <li v-if="filterOptions.length === 0" class="custom-select__options__empty">
                    Aucune autre option
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.custom-select {
    position: relative;

    &__selected {
        $padding-right: 3rem;

        width: 100%;
        min-height: 3.25rem;

        padding: 1rem $padding-right 1rem 1.5rem;

        @extend %default-border;
        border-radius: 0.5rem;
        outline-color: v.$accent;

        cursor: pointer;

        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;

        position: relative;

        &__multiple {
            width: fit-content;

            background-color: v.$white;

            @extend %default-border;
            border-radius: 0.375rem;

            @extend %default-shadow;

            font-size: 0.875rem;

            padding: 0.25rem 0.75rem;

            display: flex;
            gap: 0.5rem;
            align-items: center;

            &__remove {
                font-size: 0.5rem;

                &__icon {
                    @include m.size(1.25rem);
                }
            }
        }

        &__indicator {
            position: absolute;
            top: 50%;
            right: calc($padding-right / 2);
            transform: translateY(-50%);

            transition: transform 0.3s ease;
        }

        &--open &__indicator {
            transform: translateY(-50%) rotate(180deg);
        }
    }

    &__placeholder {
        color: v.$dark-gray;
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

        @extend %default-border;
        border-radius: 0.5rem;

        padding: 0.25rem;

        @extend %default-shadow;

        list-style: none;

        &--before {
            top: unset;
            bottom: calc(100% + 0.5rem);
        }

        &-enter-active,
        &-leave-active {
            transition: opacity 0.3s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }

        &__option {
            padding: 0.25rem 0.5rem;

            border-radius: 0.125rem;

            cursor: pointer;

            transition: background-color 0.3s ease;

            @include m.hover() {
                background-color: v.$very-light-gray;
            }
        }

        &__empty {
            color: v.$dark-gray;

            margin: 0.5rem;
        }
    }
}
</style>
