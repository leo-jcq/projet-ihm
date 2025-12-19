<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import type { Gym, GymGrade } from '@/types/model.d';
import { Pencil1Outlined, Trash3Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';
import RatingStars from '../RatingStars.vue';
import GymRateForm from './GymRateForm.vue';

const props = defineProps<{ gym: Gym }>();

// Notes
const grades = computed(() => {
    return dataStore.gymGrades.filter((grade) => grade.gymId === props.gym.id);
});

const averageGrade = computed(() => {
    if (grades.value.length === 0) return null;

    let total = 0;

    for (let i = 0; i < grades.value.length; i++) {
        total += grades.value[i]!.grade;
    }

    return total / grades.value.length;
});

function removeRate(grade: GymGrade) {
    dataStore.gymGrades = dataStore.gymGrades.filter((g) => g !== grade);
}

// Form
const { isOpen, open, close } = useOpen();
</script>

<template>
    <div class="gym-grades">
        <div class="gym-grades__top">
            <div class="gym-grades__top__left">
                <h3 class="gym__sub-title">Avis :</h3>
                <RatingStars :rating="averageGrade" class="gym-grades__top__grade" display-number />
            </div>

            <button class="gym-grades__new" @click="open">
                <Lineicons :icon="Pencil1Outlined" class="gym-grades__new__icon" />
                Rédiger un avis
            </button>
        </div>

        <GymRateForm v-if="isOpen" :gym-id="gym.id" @close="close" />

        <div v-for="(grade, index) in grades" :key="index" class="gym-grades__grade">
            <UserModal :user-id="grade.userId" />

            <RatingStars :rating="grade.grade" display-number />

            <p v-if="grade.comment" class="gym-grades__grade__comment">{{ grade.comment }}</p>

            <GlassBtn
                v-if="grade.userId === userStore.user.id"
                class="gym-grades__grade__delete"
                @click="removeRate(grade)"
            >
                <Lineicons :icon="Trash3Outlined" />
            </GlassBtn>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';

.gym-grades {
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

    &__grade {
        @extend %default-box;

        padding: 1.5rem;

        position: relative;

        &__delete {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;

            pointer-events: none;

            opacity: 0;

            transition: opacity 0.2s ease, background-color 0.3s ease;
        }

        &:hover &__delete {
            pointer-events: auto;

            opacity: 1;
        }
    }
}
</style>
