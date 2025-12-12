<script setup lang="ts">
import dataStore from '@/stores/data';
import type { Message } from '@/types/model';
import { computed } from 'vue';
import UserModal from '../Users/UserModal.vue';
import { dateToSince } from '@/utils/time';

const props = defineProps<{ message: Message }>();

const emit = defineEmits<{
    (e: 'open', id: number): void;
}>();

const user = computed(() => dataStore.users.find((u) => u.id === props.message.userId));
</script>

<template>
    <article
        v-if="user"
        class="conv-preview"
        :class="{ 'conv-preview--unread': !message.read }"
        @click="$emit('open', message.id)"
    >
        <UserModal :user="user" :secondary="message.text" :link="false" />

        <div class="conv-preview__right">
            <div class="conv-preview__time">{{ dateToSince(message.date) }}</div>
            <div v-if="!message.read" class="conv-preview__dot" />
        </div>
    </article>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.conv-preview {
    @extend %flex-between;

    padding: 0.875rem;

    background: v.$white;

    border-radius: 0.625rem;

    @extend %default-shadow;

    cursor: pointer;

    &--unread {
        border-left: 4px solid v.$accent;
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
}
</style>
