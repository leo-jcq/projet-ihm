<script setup lang="ts">
import type { Gym } from '@/types/model';

withDefaults(
    defineProps<{
        item: Gym;
        interactive?: boolean;
    }>(),
    {
        interactive: true
    }
);
</script>

<template>
    {{ item.name }}
</template>

<style lang="scss">
</style>