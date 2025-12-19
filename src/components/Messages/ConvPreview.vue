<script setup lang="ts">
import dataStore from '@/stores/data';
import type { Message } from '@/types/model';
import { computed } from 'vue';
import UserModal from '../Users/UserModal.vue';

const props = defineProps<{ message: Message }>();

const emit = defineEmits<{
    (e: 'open', id: Message): void;
}>();

const user = computed(() => dataStore.users.find((u) => u.id === props.message.userId));
</script>

<template>
    <article
        v-if="user"
        class="conv-preview"
        :class="{ 'conv-preview--unread': !message.read }"
        @click="$emit('open', message)"
    >
        <div class="conv-preview__top">
            <UserModal :user="user" />

            <div class="conv-preview__right">
                <div class="conv-preview__time">{{ message.date }}</div>
                <div v-if="!message.read" class="conv-preview__dot" />
            </div>
        </div>

        <p class="conv-preview__text">{{ message.text }}</p>
    </article>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.conv-preview {
    padding: 0.875rem;

    background: v.$white;

    border-radius: 0.625rem;

    @extend %default-shadow;

    cursor: pointer;

    &--unread {
        border-left: 4px solid v.$accent;
    }

    &__top {
        @extend %flex-between;

        margin-bottom: 0.5rem;
    }

    &__time {
        font-size: 0.75rem;
        color: v.$dark-gray;

        margin-bottom: 0.5rem;
    }

    &__dot {
        @include m.size(0.75rem);

        background-color: v.$accent;

        border-radius: 50%;

        margin: 0 auto;
    }

    &__text {
        font-size: 0.875rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: v.$dark-gray;

        overflow: hidden;
    }
}
</style>
