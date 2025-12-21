<script setup lang="ts">
import { ChevronLeftOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';

defineProps<{ images: string[] }>();

const currentIndex = ref(0);
</script>

<template>
    <div class="image-caroussel">
        <div
            class="image-caroussel__images"
            :style="`transform:translateX(-${100 * currentIndex}%);`"
        >
            <img
                v-for="image in images"
                :key="image"
                :src="image"
                :alt="image"
                class="image-caroussel__images__img"
            />
        </div>

        <button
            class="image-caroussel__btn image-caroussel__btn--prev"
            title="Image précédente"
            :disabled="currentIndex === 0"
            @click="currentIndex--"
        >
            <Lineicons :icon="ChevronLeftOutlined" />
        </button>
        <button
            class="image-caroussel__btn image-caroussel__btn--next"
            title="Image suivante"
            :disabled="currentIndex === images.length - 1"
            @click="currentIndex++"
        >
            <Lineicons :icon="ChevronLeftOutlined" />
        </button>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.image-caroussel {
    width: 100%;
    aspect-ratio: 4/3;

    position: relative;

    overflow: hidden;

    border-radius: 0.375rem;

    &__images {
        position: absolute;
        inset: 0;

        display: flex;
        align-items: center;

        transition: transform 0.3s ease;
        &__img {
            @include m.size(100%);

            object-fit: cover;
        }
    }

    &__btn {
        @include m.rounded(2.5rem);

        @extend %flex-center;

        position: absolute;
        top: 50%;

        background-color: v.$white;

        border: 1px solid currentColor;

        cursor: pointer;

        color: v.$dark-gray;

        @include m.transition-group(0.3s, ease, color, background-color, opacity);

        @include m.hover() {
            background-color: v.$light-orange;

            color: v.$orange;
        }

        &:disabled {
            opacity: 0.5;

            cursor: not-allowed;
        }

        &--prev {
            left: 1rem;
        }

        &--next {
            right: 1rem;
            transform: rotate(180deg);
        }
    }
}
</style>
