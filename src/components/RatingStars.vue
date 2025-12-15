<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ rating: number | null }>();

const stars = computed(() => {
    if (!props.rating) return Array.from({ length: 5 }, () => 'empty');

    return Array.from({ length: 5 }, (_, i) => {
        const index = i + 1;
        if (index <= Math.floor(props.rating!)) {
            return 'full';
        } else if (index - props.rating! < 1 && index - props.rating! > 0) {
            return 'half';
        }
        return 'empty';
    });
});
</script>

<template>
    <div class="rating-stars" :title="`${Math.round(rating! * 10) / 10}/5`">
        <span v-for="(star, index) in stars" :key="index" :class="['rating-stars__star', star]">
            ★
        </span>
    </div>
</template>

<style lang="scss" scoped>
.rating-stars {
    display: flex;
    gap: 0.25rem;
    align-items: center;

    &__star {
        font-size: 1.25rem;
        transition: color 0.2s ease;

        &.full {
            color: #fbbf24;
        }

        &.half {
            background: linear-gradient(90deg, #fbbf24 50%, #d1d5db 50%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        &.empty {
            color: #d1d5db;
        }
    }
}
</style>
