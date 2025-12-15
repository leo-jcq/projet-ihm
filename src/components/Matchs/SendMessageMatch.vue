<script setup lang="ts">
import type { User } from '@/types/model';
import { ref } from 'vue';
import PopUp from '../PopUp.vue';
import UserModal from '../Users/UserModal.vue';

defineProps<{ user: User }>();

defineEmits<{
    send: [];
    cancel: [];
}>();

const message = ref('');
</script>

<template>
    <PopUp :title="`Envoyer un message à ${user.name}`">
        <div class="send-message-match">
            <div class="send-message-match__user">
                <UserModal :user="user" />
            </div>

            <div class="send-message-match__textarea-wrapper">
                <textarea
                    v-model="message"
                    class="send-message-match__textarea"
                    placeholder="Écrivez votre message ici..."
                />
            </div>

            <div class="send-message-match__actions">
                <button
                    class="send-message-match__btn send-message-match__btn--cancel"
                    title="Annuler"
                    @click="$emit('cancel')"
                >
                    Annuler
                </button>
                <button
                    class="send-message-match__btn send-message-match__btn--send"
                    :disabled="message === ''"
                    title="Envoyer"
                    @click="$emit('send')"
                >
                    Envoyer
                </button>
            </div>
        </div>
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/variables' as v;
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';

.send-message-match {
    width: 400px;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    padding: 1.5rem;

    &__user {
        display: flex;
        align-items: center;
        gap: 1rem;

        padding: 1rem;

        background: v.$very-light-gray;

        border-radius: 0.5rem;
    }

    &__avatar {
        @include m.size(3rem);

        border-radius: 50%;

        object-fit: cover;
    }

    &__user-info {
        flex: 1;

        min-width: 0;
    }

    &__username {
        font-weight: 600;
        color: v.$grayish-black;

        margin: 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__level {
        font-size: 0.875rem;
        color: v.$dark-gray;

        margin: 0.25rem 0 0 0;
    }

    &__textarea-wrapper {
        display: flex;
        flex-direction: column;

        gap: 0.5rem;
    }

    &__textarea {
        width: 100%;
        min-height: 120px;

        padding: 0.75rem;

        border: 1px solid v.$light-gray;
        border-radius: 0.5rem;

        font-family: inherit;
        font-size: 0.95rem;
        color: v.$grayish-black;

        resize: vertical;

        transition: border-color 0.3s ease;

        &:focus {
            outline: none;
            border-color: v.$accent;
        }

        &:disabled {
            background-color: v.$very-light-gray;
            cursor: not-allowed;
        }
    }

    &__actions {
        display: flex;
        gap: 0.75rem;

        justify-content: flex-end;
    }

    &__btn {
        padding: 0.75rem 1.5rem;

        border: none;
        border-radius: 0.5rem;

        font-weight: 500;
        cursor: pointer;

        transition: all 0.3s ease;

        &:disabled {
            opacity: 0.5;

            cursor: not-allowed;
        }

        &--cancel {
            color: v.$grayish-black;

            transition: background-color 0.3s ease;

            &:hover {
                background-color: v.$light-gray;
            }
        }

        &--send {
            background: v.$main-gradient;
            color: v.$white;

            &:hover {
                background: v.$main-gradient-lighten;
            }
        }
    }
}
</style>
