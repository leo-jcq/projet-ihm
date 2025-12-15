<script setup lang="ts">
import dataStore from '@/stores/data';
import type { Gym } from '@/types/model';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<
        (
            | {
                  gym: Gym;
                  id: undefined;
              }
            | {
                  gym: undefined;
                  id: number;
              }
        ) & {
            interactive?: boolean;
            showRate?: boolean;
        }
    >(),
    {
        interactive: false,
        showRate: false
    }
);

const finalGym = computed(() =>
    props.gym ? props.gym : dataStore.gyms.find((g) => g.id === props.id)
);
</script>

<template>
    <div v-if="finalGym" class="gym-box" :class="{ 'gym-box--interractive': interactive }">
        {{ finalGym.name }}, {{ finalGym.location }}
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym-box {
    @extend %default-border;
    border-radius: 0.3125rem;

    padding: 0.375rem 0.5rem;

    @extend %default-shadow;

    background-color: v.$white;
}
</style>
