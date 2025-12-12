<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value: number; max: number }>();

const emits = defineEmits<{
    input: [Event];
}>();

function handleInput(e: Event) {
    emits('input', e);
}

const trackWidth = computed(() => (props.value * 100) / props.max);
</script>

<template>
    <div class="custom-range">
        <div class="custom-range__track" :style="`width:${trackWidth}%`" />
        <input
            v-bind="$attrs"
            type="range"
            class="custom-range__input"
            :value="value"
            :max="max"
            @input="handleInput"
        />
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.custom-range {
    $track-height: 0.5rem;

    position: relative;

    &__track {
        height: $track-height;

        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        border-radius: 9999px;

        background-image: v.$main-gradient;
    }

    &__input {
        -webkit-appearance: none;
        appearance: none;

        @include m.size(100%, $track-height);

        border-radius: 9999px;

        background: v.$light-gray;

        outline: none;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;

            @include m.size(1.5rem);

            border-radius: 50%;

            background-color: v.$main-gradient-end;

            position: relative;
            z-index: 2;

            cursor: pointer;
        }

        &::-moz-range-thumb {
            @include m.size(1.5rem);

            border-radius: 50%;

            background-color: v.$main-gradient-end;

            position: relative;
            z-index: 2;

            cursor: pointer;
        }
    }
}
</style>
