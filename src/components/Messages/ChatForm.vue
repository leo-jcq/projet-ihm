<script setup lang="ts">
import messageStore from '@/stores/messages';
import { generateNumberId } from '@/utils/generateId';
import { GalleryOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';

const emit = defineEmits<{ submit: [] }>();

const newMessage = ref('');

function handleSubmit() {
    messageStore.messages.push({
        id: generateNumberId(),
        text: newMessage.value,
        time: "à l'instant",
        sendByUser: true
    });
    emit('submit');
    newMessage.value = '';
}

function handleSendImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        const files = Array.from(target.files);

        for (let i = 0; i < files.length; i++) {
            const file = files[i]!;
            messageStore.messages.push({
                id: generateNumberId(),
                image: URL.createObjectURL(file),
                time: "à l'instant",
                sendByUser: true
            });
        }

        emit('submit');
        target.value = '';
    }
}
</script>

<template>
    <form class="chat-form" @submit.prevent="handleSubmit">
        <input
            v-model="newMessage"
            type="text"
            class="chat-form__input"
            placeholder="Votre message..."
        />

        <button
            v-if="newMessage !== ''"
            type="submit"
            class="chat-form__btn chat-form__btn--submit"
            title="Envoyer le message"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                <path
                    d="M322.5 351.7L523.4 150.9L391 520.3L322.5 351.7zM489.4 117L288.6 317.8L120 249.3L489.4 117zM70.1 280.8L275.9 364.4L359.5 570.2C364.8 583.3 377.6 591.9 391.8 591.9C406.5 591.9 419.6 582.7 424.6 568.8L602.6 72C606.1 62.2 603.6 51.4 596.3 44C589 36.6 578.1 34.2 568.3 37.7L71.4 215.7C57.5 220.7 48.3 233.8 48.3 248.5C48.3 262.7 56.9 275.5 70 280.8z"
                    fill="currentColor"
                />
            </svg>
        </button>

        <label
            v-else
            type="button"
            class="chat-form__btn chat-form__btn--image"
            title="Envoyer une photo"
        >
            <Lineicons :icon="GalleryOutlined" />
            <input
                type="file"
                class="chat-form__btn__input"
                accept=".png,.jpeg,.jpg"
                @change="handleSendImage"
            />
        </label>
    </form>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.chat-form {
    $input-height: 52px;

    border-top: 1px solid v.$light-gray;

    padding: 1.5rem 1.25rem;

    display: flex;
    align-items: center;

    &__input {
        @include m.size(100%, $input-height);

        @extend %default-border;
        border-radius: 0.5rem 0 0 0.5rem;
        outline-color: v.$accent;

        padding: 0 1.5rem;

        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__btn {
        @include m.size($input-height);

        background-color: v.$white;

        @extend %default-border;
        border-left: none;
        border-radius: 0 0.5rem 0.5rem 0;

        @extend %flex-center;

        cursor: pointer;

        &--submit {
            color: v.$white;

            background-image: v.$main-gradient;

            @include m.hover() {
                background-image: v.$main-gradient-lighten;
            }
        }

        &--image {
            transition: background-color 0.3s ease;

            @include m.hover() {
                background-color: v.$grayish-white;
            }
        }

        &__input {
            display: none;
        }
    }
}
</style>
