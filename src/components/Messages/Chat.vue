<script setup lang="ts">
import messageStore, { resetMessageStore } from '@/stores/messages';
import type { User } from '@/types/model';
import { nextTick, useTemplateRef, watch } from 'vue';
import ChatForm from './ChatForm.vue';
import ChatMessage from './ChatMessage.vue';

const props = defineProps<{ user: User | null }>();

// Chat change
watch(
    () => props.user,
    () => {
        resetMessageStore();
        nextTick(scrollToBottom);
    }
);

// New message
const messagesRef = useTemplateRef('messages');

function scrollToBottom() {
    if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
}

function handleSendMessage() {
    nextTick(scrollToBottom);
}
</script>

<template>
    <div class="chat">
        <template v-if="user">
            <RouterLink :to="`/user/${user.id}`" class="chat__user">
                <img class="chat__user__avatar" :src="user.avatar" :alt="user.name" />
                <h2 class="chat__user__name">{{ user.name }}</h2>
                <span class="chat__user__pseudo">@{{ user.pseudo }}</span>
            </RouterLink>

            <div ref="messages" class="chat__messages">
                <ChatMessage
                    v-for="(msg, index) in messageStore.messages"
                    :key="msg.id"
                    :user="user"
                    :message="msg"
                    :prev-message="messageStore.messages[index - 1]"
                    :next-message="messageStore.messages[index + 1]"
                />
            </div>

            <ChatForm @submit="handleSendMessage" />
        </template>
        <div v-else class="chat__select">Veuillez sélectionner une conversation</div>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.chat {
    height: calc(100vh - v.$header-height - v.$top-gap * 2);

    display: flex;
    flex-direction: column;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    grid-column: 2/3;

    @extend %default-box;

    &__user {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 1.75rem;

        border-bottom: 1px solid v.$light-gray;

        text-decoration: none;
        color: v.$black;

        &__avatar {
            @include m.rounded(4rem);

            border: 2px solid v.$accent;

            object-fit: cover;

            margin-bottom: 0.75rem;
        }

        &__name {
            font-size: 1rem;
            font-weight: 400;
        }

        &__pseudo {
            font-size: 0.875rem;
            color: v.$very-dark-gray;

            @include m.hover() {
                text-decoration: underline;
            }
        }
    }

    &__messages {
        flex: 1;
        min-height: 0;

        overflow: auto;

        margin-top: auto;
        padding: 1.375rem 1rem;

        display: flex;
        flex-direction: column;
    }

    &__select {
        height: 100%;

        @extend %flex-center;

        font-size: 1.125rem;
        color: v.$dark-gray;
    }
}
</style>
