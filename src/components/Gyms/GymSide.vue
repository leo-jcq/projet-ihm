<script setup lang="ts">
import WeekDay, { WeekDayToString, type TWeekDay } from '@/enums/WeekDay';
import type { Gym } from '@/types/model';
import { Globe1Outlined, Telephone1Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed } from 'vue';

const props = defineProps<{ gym: Gym }>();

const today = computed<TWeekDay>(() => {
    let day = new Date().getDay();

    day = day === 0 ? 6 : day - 1;

    return Object.values(WeekDay)[day]!;
});

const todayOpeningHours = computed(() => props.gym.openingHours[today.value]!);

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
</script>

<template>
    <div class="gym-side">
        <div class="gym-side__top">
            <h3 class="gym-side__title">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="gym-side__title__icon"
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
            <p class="gym-side__status">
                <span
                    class="gym-side__status__indicator"
                    :class="{ 'gym-side__status__indicator--open': gymIsOpen }"
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

            <ul class="gym-side__timetable">
                <li
                    v-for="weekDay in WeekDay"
                    :key="weekDay"
                    class="gym-side__timetable__day"
                    :class="{ 'gym-side__timetable__day--today': weekDay === today }"
                >
                    {{ WeekDayToString[weekDay] }} : {{ gym.openingHours[weekDay].open }}-{{
                        gym.openingHours[weekDay].close
                    }}
                </li>
            </ul>

            <h3 class="gym-side__title">
                <Lineicons :icon="Telephone1Outlined" class="gym-side__title__icon" />
                Téléphone
            </h3>

            <a :href="`tel:${gym.phone.replace(/ /g, '')}`" class="gym-side__link">
                {{ gym.phone }}
            </a>

            <h3 class="gym-side__title">
                <Lineicons :icon="Globe1Outlined" class="gym-side__title__icon" />
                Site web
            </h3>

            <a
                v-if="gym.website"
                :href="gym.website"
                target="_blank"
                rel="noopener noreferrer"
                class="gym-side__link"
            >
                {{ gym.website }}
            </a>
        </div>
    </div>
</template>

<style lang="scss">
@use "@/scss/mixins" as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym-side {
    height: fit-content;

    grid-column: 3/4;

    padding: 1.5rem;

    @extend %default-box;

    &__top {
        margin-bottom: 1rem;
    }

    &__title {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        margin: 1.25rem 0 0.5rem;

        font-size: 1rem;
        font-weight: 500;

        &__icon {
            color: v.$accent;
        }
    }

    & &__title:first-child {
        margin-top: 0;
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

    &__timetable {
        list-style: none;

        display: flex;
        flex-direction: column;
        gap: 0.375rem;

        margin-top: 0.75rem;

        &__day {
            &--today {
                font-weight: 600;
            }
        }
    }

    &__link {
        color: v.$very-dark-gray;

        display: block;

        text-decoration: none;

        @include m.hover() {
            text-decoration: underline;
        }
    }
}
</style>
