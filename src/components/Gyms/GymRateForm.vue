<script setup lang="ts">
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { StarFatBulk, StarFatOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';
import PopUp from '../PopUp.vue';

const props = defineProps<{ gymId: number }>();

const emit = defineEmits<{ close: [] }>();

const grade = ref(0);
const comment = ref('');

function handleSubmit() {
    if (grade.value === 0) return;

    const trimComment = comment.value.trim();

    dataStore.gymGrades.unshift({
        gymId: props.gymId,
        userId: userStore.user.id,
        grade: grade.value,
        comment: trimComment === '' ? undefined : trimComment
    });

    comment.value = '';

    emit('close');
}
</script>

<template>
    <PopUp title="Rédiger un avis" @close="$emit('close')">
        <form class="gym-rate-form" @submit.prevent="handleSubmit">
            <div class="gym-rate-form__main">
                <!-- Note -->
                <div class="gym-rate-form__field">
                    <label for="name" class="gym-rate-form__label">Note</label>

                    <div class="gym-rate-form__field__group">
                        <button
                            v-for="g in [1, 2, 3, 4, 5]"
                            :key="g"
                            type="button"
                            class="gym-rate-form__rate-btn"
                            :class="{ 'gym-rate-form__rate-btn--active': g <= grade }"
                            @click="grade = grade === g ? 0 : g"
                        >
                            <Lineicons
                                :icon="g <= grade ? StarFatBulk : StarFatOutlined"
                                class="gym-rate-form__rate-btn__icon"
                            />
                        </button>
                    </div>
                </div>

                <!-- Commentaire -->
                <div class="gym-rate-form__field">
                    <label for="name" class="gym-rate-form__label">Commentaire</label>
                    <textarea
                        id="name"
                        v-model="comment"
                        type="text"
                        class="gym-rate-form__textarea"
                        placeholder="Rédigez votre avis (optionnel)..."
                    />
                </div>
            </div>

            <!-- Actions -->
            <div class="gym-rate-form__bottom">
                <button
                    type="button"
                    class="gym-rate-form__bottom__btn gym-rate-form__bottom__btn--cancel"
                    @click="$emit('close')"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    class="gym-rate-form__bottom__btn gym-rate-form__bottom__btn--confirm"
                    :disabled="grade === 0"
                >
                    Créer
                </button>
            </div>
        </form>
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym-rate-form {
    min-width: 650px;

    &__main {
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__field {
        &__group {
            @extend %flex-center;
            gap: 0.75rem;
        }
    }

    &__rate-btn {
        border: none;

        @extend %flex-center;

        background-color: transparent;

        color: v.$very-dark-gray;

        cursor: pointer;

        &--active {
            color: v.$accent;
        }

        &__icon {
            @include m.size(2rem);
        }
    }

    &__label {
        font-size: 0.875rem;
        color: v.$very-dark-gray;

        display: inline-block;

        margin-bottom: 8px;
    }

    &__error {
        font-size: 0.875rem;
        font-weight: 300;
        color: v.$accent;
    }

    &__textarea {
        width: 100%;

        resize: vertical;

        padding: 1rem 1.5rem;

        @extend %default-border;
        border-radius: 0.5rem;
        outline-color: v.$accent;

        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__input {
        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__bottom {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        align-items: center;

        padding: 1rem;

        border-top: 1px solid v.$light-gray;

        background-color: v.$grayish-white;

        &__btn {
            cursor: pointer;

            padding: 0.75rem 1.5rem;

            border: none;
            border-radius: 0.625rem;

            background-color: transparent;

            &--cancel {
                color: v.$grayish-black;

                transition: background-color 0.3s ease;

                &:hover {
                    background-color: v.$light-gray;
                }
            }

            &--confirm {
                background-image: v.$main-gradient;

                color: v.$white;

                transition: opacity 0.3s ease;

                &:hover:not(:disabled) {
                    background-image: v.$main-gradient-lighten;
                }

                &:disabled {
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
