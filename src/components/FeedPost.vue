<script setup lang="ts">
import PostType from '@/enums/PostType';
import { RouteTypeToString } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import type { Post } from '@/types/model';
import { dateToSince } from '@/utils/time';
import {
    Comment1Outlined,
    HeartSolid,
    HeartStroke,
    MapMarker5Outlined,
    Mountains2Outlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref } from 'vue';
import GradeBox from './GradeBox.vue';
import PostTypeBox from './PostTypeBox.vue';
import UserModal from './UserModal.vue';

const props = defineProps<{ post: Post }>();

const hasLiked = ref(false);

const timeSincePost = computed(() => dateToSince(props.post.timestamp));
const user = computed(() => dataStore.users.find((user) => user.id === props.post.authorId)!);
const route = computed(() => dataStore.routes.find((route) => route.id === props.post.routeId));
const comments = computed(() =>
    dataStore.comments.filter((comment) => comment.postId === props.post.id)
);
</script>

<template>
    <article class="feed-post">
        <div class="feed-post__top">
            <UserModal :user="user" :secondary="timeSincePost" />

            <PostTypeBox v-if="post.type !== PostType.Other" :type="post.type" />
        </div>

        <div v-if="post.images.length > 0" class="feed-post__images">
            <img
                v-for="image in post.images"
                :key="image"
                :src="image"
                alt="Image postée"
                class="feed-post__images__img"
            />
        </div>

        <div v-if="route" :class="`feed-post__route feed-post__route--${post.type}`">
            <div class="feed-post__route__left">
                <span class="feed-post__route__name">{{ route.name }}</span>

                <div class="feed-post__route__left__infos">
                    <GradeBox :grade="route.grade" />
                    <span class="feed-post__route__type">{{ RouteTypeToString[route.type] }}</span>
                    <span class="feed-post__route__location">
                        <Lineicons
                            :icon="MapMarker5Outlined"
                            class="feed-post__route__location__icon"
                        />
                        {{ route.location }}
                    </span>
                </div>
            </div>

            <span class="feed-post__route__try-count">
                <Lineicons :icon="Mountains2Outlined" class="feed-post__route__try-count__icon" />
                {{ post.tryCount }} essais
            </span>
        </div>

        <p class="feed-post__content">{{ post.content }}</p>

        <div class="feed-post__actions">
            <button
                class="feed-post__actions__btn feed-post__actions__btn--like"
                :class="{ 'feed-post__actions__btn--liked': hasLiked }"
                title="Aimer"
                @click="hasLiked = !hasLiked"
            >
                <Lineicons
                    :icon="hasLiked ? HeartSolid : HeartStroke"
                    class="feed-post__actions__btn__icon"
                />
                {{ post.likes + (hasLiked ? 1 : 0) }}
            </button>
            <button
                class="feed-post__actions__btn feed-post__actions__btn--comment"
                title="Commentaires"
            >
                <Lineicons :icon="Comment1Outlined" class="feed-post__actions__btn__icon" />
                {{ comments.length }}
            </button>
        </div>
    </article>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.feed-post {
    width: 100%;

    @extend %default-box;

    &__top {
        @extend %flex-between;

        padding: 1rem 1.625rem;
    }

    &__images {
        aspect-ratio: 4/3;

        background-color: v.$grayish-white;

        overflow: hidden;

        &__img {
            @include m.size(100%);

            object-fit: cover;
        }
    }

    &__route {
        padding: 1rem;

        border-left: 4px solid;

        background-color: v.$grayish-white;

        @extend %flex-between;

        &--success {
            border-color: v.$light-green;
        }

        &--project {
            border-color: v.$light-blue;
        }

        &--other {
            border-color: v.$light-orange;
        }

        &__left {
            &__infos {
                display: flex;
                gap: 0.75rem;
                align-items: center;
            }
        }

        &__name {
            margin-bottom: 0.5rem;

            display: block;
        }

        &__type,
        &__location {
            font-size: 0.875rem;
            color: v.$very-dark-gray;
        }

        &__location {
            display: flex;
            gap: 0.125rem;
            align-items: center;

            &__icon {
                width: 1.25rem;
            }
        }

        &__try-count {
            // height: fit-content;

            display: flex;
            gap: 0.25rem;
            align-items: center;

            font-size: 0.875rem;
            color: v.$very-dark-gray;

            &__icon {
                width: 1.25rem;
            }
        }
    }

    &__content {
        padding: 0.75rem 1rem;
    }

    &__actions {
        padding: 0.75rem 1rem 1rem 1rem;

        border-top: 1px solid v.$very-light-gray;

        display: flex;
        gap: 1.5rem;
        align-items: center;

        &__btn {
            border: none;

            background-color: transparent;

            @extend %flex-center;
            gap: 0.5rem;

            color: v.$very-dark-gray;

            cursor: pointer;

            &--like:hover,
            &--liked {
                color: v.$red;
            }

            &--comment:hover {
                color: v.$blue;
            }
        }
    }
}
</style>
