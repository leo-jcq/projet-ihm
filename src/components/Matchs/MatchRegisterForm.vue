<script setup lang="ts">
defineEmits<{ accept: []; reject: [] }>();
</script>

<template>
    <div class="match-register-form">
        <h2 class="match-register-form__title">S'inscrire aux "matchs"</h2>
        <p class="match-register-form__text">Inscrivez-vous pour rencontrer d'autres grimpeurs.</p>

        <div class="match-register-form__actions">
            <button
                class="match-register-form__btn match-register-form__btn--reject"
                @click="$emit('reject')"
            >
                Refuser
            </button>
            <button
                class="match-register-form__btn match-register-form__btn--accept"
                @click="$emit('accept')"
            >
                S'inscrire
            </button>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;
@use '@/scss/mixins' as m;

.match-register-form {
    @extend %default-box;

    padding: 2rem;

    border-radius: 1rem;

    text-align: center;

    margin: 0 auto;

    &__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: v.$grayish-black;

        margin-bottom: 0.75rem;
    }

    &__text {
        line-height: 1.5;
        color: v.$dark-gray;

        margin-bottom: 1.5rem;
    }

    &__actions {
        @extend %flex-between;

        gap: 1rem;
    }

    &__btn {
        width: 100%;

        padding: 0.75rem 1rem;

        border: none;
        border-radius: 0.5rem;

        cursor: pointer;

        transition: all 0.3s ease;

        &--reject {
            background-color: v.$light-gray;

            color: v.$grayish-black;

            border: 1px solid v.$gray;

            &:hover {
                background-color: v.$very-light-gray;
            }

            &:active {
                transform: scale(0.98);
            }
        }

        &--accept {
            background: v.$main-gradient;

            color: v.$white;

            &:hover {
                background: v.$main-gradient-lighten;
            }

            &:active {
                transform: scale(0.98);
            }
        }
    }
}
</style>
