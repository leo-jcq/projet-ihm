<script setup lang="ts">
import dataStore from '@/stores/data';
import type { Comment } from '@/types/model';
import { HeartSolid, HeartStroke } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';
import ContentActions from '../ContentActions.vue';

const props = defineProps<{ comment: Comment }>();

defineEmits<{
    delete: [number];
}>();

const liked = ref(false);

const user = computed(() => dataStore.users.find((u) => u.id == props.comment.userId));

const isMouseOver = ref(false);
</script>

<template>
    <li class="comment" @mouseenter="isMouseOver = true" @mouseleave="isMouseOver = false">
        <RouterLink v-if="user" :to="`/user/${user.id}`" class="comment__user">
            <img :src="user.avatar" :alt="user.pseudo" class="comment__user__avatar" />

            <div class="comment__user__text">
                <span class="comment__user__text__name">{{ user.name }}</span>
                <span class="comment__user__text__content">
                    {{ comment.content }}
                </span>
                <span class="comment__user__text__date">
                    {{ comment.date }}
                </span>
            </div>
        </RouterLink>

        <div class="comment__actions">
            <ContentActions
                :content-id="comment.id"
                :user-id="comment.userId"
                content-name="commentaire"
                :mouse-over-parent="isMouseOver"
                @delete="$emit('delete', comment.id)"
            />
            <button
                class="comment__btn comment__btn--like"
                :class="{
                    'comment__btn--liked': liked
                }"
                title="Aimer"
                @click="liked = true"
            >
                <Lineicons :icon="liked ? HeartSolid : HeartStroke" class="comment__like__icon" />
                {{ comment.likes + (liked ? 1 : 0) }}
            </button>
        </div>
    </li>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.comment {
    @extend %flex-between;

    &__user {
        display: flex;
        gap: 0.75em;
        align-items: center;

        color: v.$black;
        text-decoration: none;

        &__avatar {
            @include m.rounded(2.5em);

            object-fit: cover;
        }

        &__text {
            &__name,
            &__content {
                display: block;
            }

            &__name {
                font-size: 0.875em;
            }

            &__content {
                color: v.$grayish-black;
            }

            &__date {
                font-size: 0.75rem;
                color: v.$dark-gray;
            }
        }
    }

    &__actions {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    &__btn {
        border: none;

        background-color: transparent;

        @extend %flex-center;
        gap: 0.5rem;

        color: v.$very-dark-gray;

        cursor: pointer;

        font-size: 0.875rem;

        &:hover,
        &--liked {
            color: v.$red;
        }

        &--delete {
            opacity: 0;

            pointer-events: none;
        }

        &__icon {
            @include m.size(1.3125rem);
        }
    }

    &:hover &__btn--delete {
        opacity: 1;

        pointer-events: auto;
    }
}
</style>
