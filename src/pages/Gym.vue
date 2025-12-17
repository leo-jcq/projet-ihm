<script setup lang="ts">
import GlassBtn from '@/components/GlassBtn.vue';
import GymRateForm from '@/components/Gyms/GymRateForm.vue';
import RatingStars from '@/components/RatingStars.vue';
import UserModal from '@/components/Users/UserModal.vue';
import useOpen from '@/composables/useOpen';
import usePageTitle from '@/composables/usePageTitle';
import { ClimStyleToString } from '@/enums/ClimbStyle';
import { RouteTypeToString } from '@/enums/RouteType';
import WeekDay, { WeekDayToString, type TWeekDay } from '@/enums/WeekDay';
import router from '@/router';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import type { GymGrade } from '@/types/model';
import {
    ChevronLeftOutlined,
    Pencil1Outlined,
    Telephone1Outlined,
    Trash3Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const gym = computed(() => {
    return dataStore.gyms.find((g) => g.id.toString() === route.params.id);
});

if (!gym.value) {
    router.push('/not-found');
}

usePageTitle(gym.value!.name);

// Horaires
const today = computed<TWeekDay>(() => {
    let day = new Date().getDay();

    day = day === 0 ? 6 : day - 1;

    return Object.values(WeekDay)[day]!;
});

const todayOpeningHours = computed(() => gym.value!.openingHours[today.value]!);

const gymIsOpen = computed(() => {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    const [h, m] = time.split(':').map(Number);
    const [sh, sm] = todayOpeningHours.value.open.split(':').map(Number);
    const [eh, em] = todayOpeningHours.value.close.split(':').map(Number);

    const timeMinutes = h! * 60 + m!;
    const startMinutes = sh! * 60 + sm!;
    const endMinutes = eh! * 60 + em!;

    // Si end < start, on traverse minuit
    if (endMinutes < startMinutes) {
        return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }

    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
});

// Caroussel
const carousselIndex = ref(0);

// Avis
const { isOpen, open, close } = useOpen();

const grades = computed(() => {
    return dataStore.gymGrades.filter((grade) => grade.gymId === gym.value!.id);
});

const averageGrade = computed(() => {
    if (grades.value.length === 0) return null;

    let total = 0;

    for (let i = 0; i < grades.value.length; i++) {
        total += grades.value[i]!.grade;
    }

    return total / grades.value.length;
});

function removeComment(grade: GymGrade) {
    dataStore.gymGrades = dataStore.gymGrades.filter((g) => g !== grade);
}
</script>

<template>
    <!-- Main -->
    <main class="gym">
        <div class="gym__top">
            <img :src="gym!.logo" :alt="gym!.name" class="gym__logo" />

            <div class="gym__top__text">
                <h2 class="gym__name">{{ gym!.name }}</h2>

                <div class="gym__route-types">
                    <span
                        v-for="type in gym!.routeTypes"
                        :key="type"
                        class="gym__route-types__type"
                    >
                        {{ RouteTypeToString[type] }}
                    </span>
                    <span v-for="style in gym!.styles" :key="style" class="gym__route-types__type">
                        {{ ClimStyleToString[style] }}
                    </span>
                </div>

                <span class="gym__adress">{{ gym!.location }}</span>
            </div>
        </div>

        <h3 class="gym__sub-title">Dernière images</h3>

        <div class="gym__images">
            <div
                class="gym__images__caroussel"
                :style="`transform:translateX(-${100 * carousselIndex}%);`"
            >
                <img
                    v-for="image in gym!.images"
                    :key="image"
                    :src="image"
                    :alt="image"
                    class="gym__images__image"
                />
            </div>

            <button
                class="gym__images__btn gym__images__btn--prev"
                title="Image précédente"
                :disabled="carousselIndex === 0"
                @click="carousselIndex--"
            >
                <Lineicons :icon="ChevronLeftOutlined" />
            </button>
            <button
                class="gym__images__btn gym__images__btn--next"
                title="Image suivante"
                :disabled="carousselIndex === gym!.images.length - 1"
                @click="carousselIndex++"
            >
                <Lineicons :icon="ChevronLeftOutlined" />
            </button>
        </div>

        <div class="gym__grades">
            <div class="gym__grades__top">
                <div class="gym__grades__top__left">
                    <h3 class="gym__sub-title">Avis :</h3>
                    <RatingStars
                        :rating="averageGrade"
                        class="gym__grades__top__grade"
                        display-number
                    />
                </div>

                <button class="gym__grades__new" @click="open">
                    <Lineicons :icon="Pencil1Outlined" class="gym__grades__new__icon" />
                    Rédiger un avis
                </button>
            </div>

            <GymRateForm v-if="isOpen" :gym-id="gym!.id" @close="close" />

            <div v-for="(grade, index) in grades" :key="index" class="gym__grades__grade">
                <UserModal :user-id="grade.userId" />

                <RatingStars :rating="grade.grade" display-number />

                <p v-if="grade.comment" class="gym__grades__grade__comment">{{ grade.comment }}</p>

                <GlassBtn
                    v-if="grade.userId === userStore.user.id"
                    class="gym__grades__grade__delete"
                    @click="removeComment(grade)"
                >
                    <Lineicons :icon="Trash3Outlined" />
                </GlassBtn>
            </div>
        </div>
    </main>

    <!-- Side -->
    <div class="gym__side">
        <div class="gym__side__top">
            <h3 class="gym__side__title">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="gym__side__title__icon"
                >
                    <path
                        d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                Horaires
            </h3>
            <p class="gym__side__status">
                <span
                    class="gym__side__status__indicator"
                    :class="{ 'gym__side__status__indicator--open': gymIsOpen }"
                >
                    {{ gymIsOpen ? 'Ouvert' : 'Fermé' }}
                </span>
                <span>
                    {{
                        gymIsOpen
                            ? `, ferme à ${todayOpeningHours.close}`
                            : `, ouvre à ${todayOpeningHours.open}`
                    }}
                </span>
            </p>

            <ul class="gym__timetable">
                <li
                    v-for="weekDay in Object.values(WeekDay)"
                    :key="weekDay"
                    class="gym__timetable__day"
                    :class="{ 'gym__timetable__day--today': weekDay === today }"
                >
                    {{ WeekDayToString[weekDay] }} : {{ gym!.openingHours[weekDay].open }}-{{
                        gym!.openingHours[weekDay].close
                    }}
                </li>
            </ul>

            <h3 class="gym__side__title">
                <Lineicons :icon="Telephone1Outlined" class="gym__side__title__icon" />
                Contact
            </h3>

            <a :href="`tel:${gym!.phone.replace(/ /g, '')}`" class="gym__side__contact">
                {{ gym!.phone }}
            </a>
            <a
                v-if="gym!.website"
                :href="gym!.website"
                target="_blank"
                rel="noopener noreferrer"
                class="gym__side__contact"
            >
                {{ gym!.website }}
            </a>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym {
    grid-template-columns: 2/3;

    &__top {
        @extend %default-box;

        padding: 1.5rem;

        display: flex;
        gap: 2rem;

        &__text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

    &__logo {
        @include m.rounded(7rem);

        border: 2px solid v.$accent;

        object-fit: contain;
    }

    &__name {
        font-size: 1.5rem;
        font-weight: 500;
    }

    &__route-types {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;

        &__type {
            width: fit-content;

            padding: 0.375rem 0.75rem;

            font-size: 0.875rem;
            color: v.$grayish-black;

            border-radius: 9999px;

            background-color: v.$very-light-gray;
        }
    }

    &__adress {
        color: v.$dark-gray;
    }

    &__sub-title {
        font-size: 1.25rem;
        font-weight: 500;

        display: flex;
        gap: 0.5rem;
        align-items: baseline;

        margin: 1.5rem 0 0.625rem;
    }

    &__images {
        width: 100%;
        aspect-ratio: 4/3;

        position: relative;

        overflow: hidden;

        border-radius: 0.375rem;

        &__caroussel {
            position: absolute;
            inset: 0;

            display: flex;
            align-items: center;

            transition: transform 0.3s ease;
        }

        &__image {
            @include m.size(100%);

            object-fit: cover;
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

            &:hover:not(:disabled) {
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

    &__new-grade {
        display: flex;
        gap: 0.75rem;

        margin-bottom: 0.875rem;

        &__input {
            width: 100%;
            max-width: 100%;

            resize: vertical;

            @extend %default-border;
            border-radius: 0.5rem;
            outline-color: v.$accent;

            padding: 0.5rem 1rem;

            &::placeholder {
                color: v.$dark-gray;
            }
        }

        &__publish {
            height: fit-content;

            cursor: pointer;

            padding: 0.75rem 1.5rem;

            border: none;
            border-radius: 0.625rem;

            background-image: v.$main-gradient;

            color: v.$white;

            &:hover {
                background-image: v.$main-gradient-lighten;
            }
        }
    }

    &__grades {
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

    &__side {
        height: fit-content;

        grid-template-columns: 3/4;

        padding: 1.5rem;

        @extend %default-box;

        &__top {
            margin-bottom: 1rem;
        }

        &__title {
            display: flex;
            gap: 0.5rem;
            align-items: center;

            margin-bottom: 0.75rem;

            font-size: 1rem;
            font-weight: 500;

            &__icon {
                color: v.$accent;
            }
        }

        &__status {
            display: inline-block;

            &__indicator {
                color: v.$red;

                &--open {
                    color: v.$green;
                }
            }
        }

        &__contact {
            color: v.$very-dark-gray;

            display: block;

            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &__timetable {
        list-style: none;

        display: flex;
        flex-direction: column;
        gap: 0.375rem;

        margin: 1rem 0 1.5rem;

        &__day {
            &--today {
                font-weight: 600;
            }
        }
    }
}
</style>
