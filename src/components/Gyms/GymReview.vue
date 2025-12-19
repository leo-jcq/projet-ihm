<script setup lang="ts">
import dataStore from '@/stores/data';
import type { GymReview } from '@/types/model';
import { ref } from 'vue';
import ContentActions from '../ContentActions.vue';
import RatingStars from '../RatingStars.vue';
import UserModal from '../Users/UserModal.vue';

const props = defineProps<{ review: GymReview }>();

function deleteReview() {
    const index = dataStore.gymReviews.findIndex((r) => r.id === props.review.id);
    if (index !== -1) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
            dataStore.gymReviews.splice(index, 1);
        }
    }
}

const isMouseOver = ref(false);
</script>

<template>
    <div class="gym-review" @mouseenter="isMouseOver = true" @mouseleave="isMouseOver = false">
        <div class="gym-review__top">
            <UserModal :user-id="review.userId" />

            <ContentActions
                :content-id="review.id"
                :user-id="review.userId"
                content-name="avis"
                content-pronoun="l'"
                :mouse-over-parent="isMouseOver"
                @delete="deleteReview"
            />
        </div>

        <RatingStars :rating="review.grade" display-number />

        <p v-if="review.comment" class="gym-review__comment">{{ review.comment }}</p>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';

.gym-review {
    @extend %default-box;

    padding: 1.5rem;

    &__top {
        @extend %flex-between;
    }
}
</style>
