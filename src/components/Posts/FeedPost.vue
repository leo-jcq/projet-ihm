<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import PostType from '@/enums/PostType';
import { RouteTypeToString } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import type { Post } from '@/types/model';
import { generateNumberId } from '@/utils/generateId';
import {
    Comment1Outlined,
    HeartSolid,
    HeartStroke,
    MapMarker5Outlined,
    Mountains2Outlined,
    XmarkOutlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, ref, useTemplateRef } from 'vue';
import GlassBtn from '../GlassBtn.vue';
import GradeBox from '../Routes/GradeBox.vue';
import UserModal from '../Users/UserModal.vue';
import Comment from './Comment.vue';
import PostTypeBox from './PostTypeBox.vue';

const props = defineProps<{ post: Post }>();

const hasLiked = ref(false);

// Comments
const postRef = useTemplateRef('post');
const { isOpen, close, toggle } = useOpen(postRef);
const newComment = ref('');

const comments = computed(() =>
    dataStore.comments.filter((comment) => comment.postId === props.post.id)
);

function postNewComment() {
    if (newComment.value !== '') {
        dataStore.comments.unshift({
            id: generateNumberId(),
            postId: props.post.id,
            userId: userStore.user.id,
            content: newComment.value,
            likes: 0,
            date: "à l'instant"
        });
        newComment.value = '';
    }
}

function deleteComment(commentId: number) {
    const index = dataStore.comments.findIndex((comment) => comment.id === commentId);
    if (index !== -1) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            dataStore.comments.splice(index, 1);
        }
    }
}

// Infos
const user = computed(() => dataStore.users.find((user) => user.id === props.post.authorId)!);
const route = computed(() => dataStore.routes.find((route) => route.id === props.post.routeId));
</script>

<template>
    <article ref="post" class="feed-post">
        <div class="feed-post__top">
            <UserModal :user="user" :secondary="props.post.date" link />

            <PostTypeBox v-if="post.type !== PostType.Other" :type="post.type" />
        </div>

        <div v-if="post.image" class="feed-post__image">
            <img :src="post.image" alt="Image postée" class="feed-post__image__img" />
        </div>

        <div v-if="route" :class="`feed-post__route feed-post__route--${post.type}`">
            <div class="feed-post__route__left">
                <span class="feed-post__route__name">{{ route.name }}</span>

                <div class="feed-post__route__left__infos">
                    <GradeBox :grade="route.grade" :route-type="route.type" />
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

        <p v-if="post.content !== ''" class="feed-post__content">{{ post.content }}</p>

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
                @click="toggle"
            >
                <Lineicons :icon="Comment1Outlined" class="feed-post__actions__btn__icon" />
                {{ comments.length }}
            </button>
        </div>

        <Transition name="feed-post__comments">
            <div v-if="isOpen" class="feed-post__comments">
                <h3 class="feed-post__comments__title">
                    Commentaires
                    <GlassBtn title="Fermer" @click="close">
                        <Lineicons :icon="XmarkOutlined" />
                    </GlassBtn>
                </h3>

                <ul class="feed-post__comments__comments">
                    <Comment
                        v-for="comment in comments"
                        :key="comment.id"
                        :comment="comment"
                        @delete="deleteComment"
                    />
                </ul>

                <form class="feed-post__comments__new" @submit.prevent="postNewComment">
                    <input
                        v-model="newComment"
                        type="text"
                        class="feed-post__comments__new__input"
                        placeholder="Ajouter un commentaire"
                    />
                    <button type="submit" class="feed-post__comments__new__submit">Publier</button>
                </form>
            </div>
        </Transition>
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

    &__image {
        width: 100%;

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

        display: flex;
        justify-content: space-between;
        align-items: flex-start;

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

        white-space: pre-line;
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

    &__comments {
        border-top: 1px solid v.$very-light-gray;

        padding: 0.75rem 1rem 1rem 1rem;

        overflow: hidden;

        &__title {
            font-size: 1.125rem;
            font-weight: 400;
            color: v.$grayish-black;

            @extend %flex-between;

            margin-bottom: 0.75rem;
        }

        &__comments {
            max-height: 20rem;

            list-style: none;

            overflow-y: auto;

            display: flex;
            gap: 0.875rem;
            flex-direction: column-reverse;
        }

        &-enter-active,
        &-leave-active {
            height: 154px;

            @include m.transition-group(0.2s, ease-in-out, color, opacity, height);
        }

        &-enter-from,
        &-leave-to {
            height: 0;

            opacity: 0;
        }

        &__new {
            padding-top: 1rem;

            display: flex;
            gap: 0.875rem;
            align-items: center;

            &__input {
                width: 100%;

                padding: 1rem 1.5rem;

                @extend %default-border;
                border-radius: 0.5rem;
                outline-color: v.$accent;
            }

            &__submit {
                padding: 0.75rem 1.5rem;

                border: none;
                border-radius: 0.5rem;

                background-image: v.$main-gradient;

                color: v.$white;

                cursor: pointer;

                &:hover {
                    background-image: v.$main-gradient-lighten;
                }
            }
        }
    }
}
</style>
