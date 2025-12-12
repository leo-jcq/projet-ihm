<script setup lang="ts">
defineProps<{ grade: string }>();

// TODO: convertir type de cotation
</script>

<template>
    <span class="grade-box">{{ grade }}</span>
</template>

<style lang="scss">
@use "@/scss/placeholders";
@use '@/scss/variables' as v;

.grade-box {
    padding: 0.125rem 0.375rem;

    @extend %default-border;
    border-radius: 0.25rem;

    font-size: 0.875rem;
    color: v.$very-dark-gray;

    background-color: v.$white;

    display: inline-block;
}
</style>
