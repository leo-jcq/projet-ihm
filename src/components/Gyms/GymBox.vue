<script setup lang="ts">
import dataStore from '@/stores/data';
import type { Gym } from '@/types/model';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<
        | {
              gym: Gym;
              id: undefined;
              interactive?: boolean;
          }
        | {
              gym: undefined;
              id: number;
              interactive?: boolean;
          }
    >(),
    {
        interactive: true
    }
);

const finalGym = computed(() =>
    props.gym ? props.gym : dataStore.gyms.find((g) => g.id === props.id)
);
</script>

<template>
    <div v-if="finalGym" class="gym-box">{{ finalGym.name }}, {{ finalGym.location }}</div>
</template>

<style lang="scss">
@use "@/scss/placeholders";
@use "@/scss/variables" as v;

.gym-box {
    @extend %default-border;

    padding: 0.375rem 0.5rem;

    @extend %default-shadow;
}
</style>
