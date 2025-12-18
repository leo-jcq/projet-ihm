<script setup lang="ts">
import PopUp from '../PopUp.vue';

defineProps<{ title: string; submitText: string }>();

defineEmits<{ cancel: []; submit: [] }>();
</script>

<template>
    <PopUp
        :title="title"
        @close="$emit('cancel')"
    >
        <form class="form" @submit.prevent="$emit('submit')">
            <!-- Main -->
            <div class="form__main">
                <slot />
            </div>

            <!-- Actions -->
            <div class="form__bottom">
                <button
                    type="button"
                    class="form__bottom__btn form__bottom__btn--cancel"
                    title="Annuler"
                    @click="$emit('cancel')"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    :title="submitText"
                    class="form__bottom__btn form__bottom__btn--submit"
                >
                    {{ submitText }}
                </button>
            </div>
        </form>
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/variables' as v;

.form {
    min-width: 650px;

    overflow: hidden;

    &__main {
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
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

            &--submit {
                background-image: v.$main-gradient;

                color: v.$white;

                &:hover {
                    background-image: v.$main-gradient-lighten;
                }
            }
        }
    }
}
</style>
