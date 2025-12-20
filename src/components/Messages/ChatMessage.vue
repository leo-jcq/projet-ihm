<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import { type SendedMessage } from '@/constants/defaultMessages';
import messageStore from '@/stores/messages';
import userStore from '@/stores/user';
import type { User } from '@/types/model';
import { computed, ref } from 'vue';
import ContentActions from '../ContentActions.vue';
import PopUp from '../PopUp.vue';

const props = defineProps<{
    user: User;
    message: SendedMessage;
    prevMessage?: SendedMessage;
    nextMessage?: SendedMessage;
}>();

const sender = computed(() => (props.message.sendByUser ? userStore.user : props.user));

const isNextMessageSameUser = computed(
    () => props.message.sendByUser === props.nextMessage?.sendByUser
);

// Actions
const isMouseOver = ref(false);

function handleDelete() {
    const index = messageStore.messages.findIndex((msg) => msg.id === props.message.id);
    if (index !== -1) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
            messageStore.messages.splice(index, 1);
        }
    }
}

// Image view
const { isOpen, open, close } = useOpen();
</script>

<template>
    <div
        class="chat-message"
        :class="`chat-message--${message.sendByUser ? 'sent' : 'received'}`"
        @mouseenter="isMouseOver = true"
        @mouseleave="isMouseOver = false"
    >
        <img
            v-if="!isNextMessageSameUser"
            :src="sender.avatar"
            :alt="sender.name"
            class="chat-message__avatar"
        />
        <p v-if="message.text" class="chat-message__text">{{ message.text }}</p>
        <img
            v-else-if="message.image"
            :src="message.image"
            alt="Photo"
            class="chat-message__image"
            @click="open"
        />

        <ContentActions
            :content-id="message.id"
            :user-id="sender.id"
            content-name="message"
            content-pronoun="ce"
            :mouse-over-parent="isMouseOver"
            class="chat-message__actions"
            @delete="handleDelete"
        />
    </div>

    <PopUp v-if="isOpen" title="" @close="close">
        <img :src="message.image" alt="Photo" class="chat-message__image-big" />
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.chat-message {
    $image-size: 1.75rem;
    $gap: 0.5rem;

    width: 100%;

    display: flex;
    gap: $gap;
    align-items: flex-end;

    margin-bottom: 0.125rem;

    &--sent:has(+ &--received),
    &--received:has(+ &--sent) {
        margin-bottom: 1rem;
    }

    &--sent {
        flex-direction: row-reverse;
    }

    &__avatar {
        @include m.rounded($image-size);

        object-fit: cover;

        margin-bottom: 0.5rem;
    }

    &__text {
        max-width: 75%;

        padding: 0.75rem;

        border-radius: 0.5rem;

        word-break: break-all;
    }

    &__image {
        @include m.max-size(75%, 150px);

        border-radius: 0.75rem;

        object-fit: contain;

        @extend %default-shadow;

        cursor: zoom-in;
    }

    &__actions {
        margin-bottom: 0.25rem;
    }

    &--sent & {
        &__text,
        &__image {
            margin-right: calc($image-size + $gap);
        }

        &__text {
            color: v.$white;

            background-image: v.$main-gradient;
        }
    }

    &--sent &__avatar + &__text,
    &--sent &__avatar + &__image {
        margin-right: 0;
    }

    &--received & {
        &__text,
        &__image {
            margin-left: calc($image-size + $gap);
        }

        &__text {
            background-color: v.$very-light-gray;

            margin-left: calc($image-size + $gap);
        }
    }

    &--received &__avatar + &__text,
    &--received &__avatar + &__image {
        margin-left: 0;
    }
}
</style>
