<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import dataStore from '@/stores/data';
import type { Gym } from '@/types/model.d';
import { Pencil1Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';
import RatingStars from '../RatingStars.vue';
import GymReviewComponent from './GymReview.vue';
import GymReviewForm from './GymReviewForm.vue';

const props = defineProps<{ gym: Gym }>();

// Notes
const reviews = computed(() => {
    return dataStore.gymReviews.filter((grade) => grade.gymId === props.gym.id);
});

const averageGrade = computed(() => {
    if (reviews.value.length === 0) return null;

    let total = 0;

    for (let i = 0; i < reviews.value.length; i++) {
        total += reviews.value[i]!.grade;
    }

    return total / reviews.value.length;
});

// Form
const { isOpen, open, close } = useOpen();
</script>

<template>
    <div class="gym-reviews">
        <div class="gym-reviews__top">
            <div class="gym-reviews__top__left">
                <h3 class="gym__sub-title">Avis :</h3>

                <RatingStars
                    :rating="averageGrade"
                    class="gym-reviews__top__grade"
                    display-number
                />
            </div>

            <button class="gym-reviews__new" @click="open">
                <Lineicons :icon="Pencil1Outlined" class="gym-reviews__new__icon" />
                Rédiger un avis
            </button>
        </div>

        <GymReviewForm v-if="isOpen" :gym-id="gym.id" @close="close" />

        <GymReviewComponent v-for="review in reviews" :key="review.id" :review="review" />
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';

.gym-reviews {
    display: flex;
    gap: 0.875rem;
    flex-direction: column;

    &__top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        &__left {
            display: flex;
            gap: 0.875rem;
            align-items: baseline;
        }

        &__grade {
            display: flex;
            gap: 0.5rem;
            align-items: baseline;
        }
    }

    &__new {
        font-size: 0.875rem;

        @extend %default-btn;

        border-radius: 9999px;
    }
}
</style>
