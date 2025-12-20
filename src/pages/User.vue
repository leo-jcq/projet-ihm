<script setup lang="ts">
import GymBox from '@/components/Gyms/GymBox.vue';
import FeedPost from '@/components/Posts/FeedPost.vue';
import PostForm from '@/components/Posts/PostForm.vue';
import GradeBox from '@/components/Routes/GradeBox.vue';
import FollowBtn from '@/components/Users/FollowBtn.vue';
import UserEditForm from '@/components/Users/UserEditForm.vue';
import useOpen from '@/composables/useOpen';
import usePageTitle from '@/composables/usePageTitle';
import RouteType, { RouteTypeToString } from '@/enums/RouteType';
import router from '@/router';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { getRandomInt } from '@/utils/random';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isLoggedUser = computed(
    () => route.fullPath.startsWith('/me') || userStore.user.id.toString() === route.params.id
);

const user = computed(() => {
    if (isLoggedUser.value) {
        return userStore.user;
    }

    return dataStore.users.find((u) => u.id.toString() === route.params.id);
});

if (!user.value) {
    router.push('/not-found');
}

usePageTitle(user.value!.name);

// Data
const posts = computed(() => dataStore.posts.filter((p) => p.authorId === user.value!.id));

const postsCount = computed(() => posts.value.length);

const nbFollowers = computed(() => getRandomInt(0, 150));
const nbFollowing = computed(() =>
    isLoggedUser.value ? dataStore.users.filter((u) => u.followed).length : getRandomInt(0, 150)
);

// Edit
const { isOpen, open, close } = useOpen();
</script>

<template>
    <!-- Main -->
    <main v-if="user" class="user">
        <!-- Top -->
        <div class="user__main">
            <img :src="user.avatar" :alt="user.name" class="user__avatar" />

            <div class="user__main__text">
                <div class="user__main__text__top">
                    <div class="user__main__text__name">
                        <h2 class="user__name">
                            {{ user.name }}
                        </h2>
                        <span class="user__pseudo">@{{ user.pseudo }}</span>
                    </div>

                    <div class="user__profile-stats">
                        <span class="user__profile-stats__stat">
                            <span class="user__profile-stats__stat__number">{{ postsCount }}</span>
                            publication{{ postsCount > 1 ? 's' : '' }}
                        </span>
                        <span class="user__profile-stats__stat">
                            <span class="user__profile-stats__stat__number">{{ nbFollowers }}</span>
                            follower{{ nbFollowers > 1 ? 's' : '' }}
                        </span>
                        <span class="user__profile-stats__stat">
                            <span class="user__profile-stats__stat__number">{{ nbFollowing }}</span>
                            suivi(e){{ nbFollowing > 1 ? 's' : '' }}
                        </span>
                    </div>
                </div>

                <p v-if="user.description.length > 0" class="user__description">
                    {{ user.description }}
                </p>

                <GradeBox v-if="user.level" :grade="user.level" :route-type="RouteType.Route" />

                <div class="user__main__styles">
                    <span
                        v-for="style in user.styles"
                        :key="style"
                        class="user__main__styles__style"
                    >
                        {{ RouteTypeToString[style] }}
                    </span>
                </div>

                <button
                    v-if="isLoggedUser"
                    class="user__main__edit"
                    title="Modifier le profil"
                    @click="open"
                >
                    Modifier le profil
                </button>
                <FollowBtn
                    v-else
                    class="user__main__follow"
                    :user="user"
                    @follow="user.followed = !user.followed"
                />

                <UserEditForm v-if="isOpen" @close="close" />
            </div>
        </div>

        <!-- Salles -->
        <div v-if="user.gymsIds.length > 0" class="user__gyms">
            <h3 class="user__title">Salles fréquentées</h3>

            <div class="user__gyms__list">
                <GymBox
                    v-for="gymId in user.gymsIds"
                    :id="gymId"
                    :key="gymId"
                    class="user__gyms__list__item"
                    link
                />
            </div>
        </div>

        <!-- Posts -->
        <div class="user__posts">
            <template v-if="posts.length > 0">
                <FeedPost v-for="post in posts" :key="post.id" :post="post" />
            </template>
            <div v-else class="user__posts__empty">
                <p class="user__posts__empty__text">
                    Aucune publication{{
                        isLoggedUser ? ', créez-en une en cliquant sur le bouton ci-dessous :' : ''
                    }}
                </p>
                <PostForm />
            </div>
        </div>
    </main>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.user {
    grid-column: 2/3;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__main {
        @extend %default-box;

        display: flex;
        gap: 1.5rem;

        padding: 1.5rem;

        &__text {
            display: flex;
            gap: 0.5rem;
            flex-direction: column;
            justify-content: space-between;

            flex: 1;

            &__top {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }

        &__styles {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            align-items: center;

            &__style {
                width: fit-content;

                padding: 0.375rem 0.75rem;

                font-size: 0.875rem;
                color: v.$grayish-black;

                border-radius: 9999px;

                background-color: v.$very-light-gray;
            }
        }

        &__edit {
            width: fit-content;

            @extend %default-btn;

            border-radius: 9999px;

            padding: 0.75rem 1rem;
        }

        &__follow {
            font-size: 1rem;
        }
    }

    &__title {
        font-size: 1.125rem;
        font-weight: 400;
    }

    &__avatar {
        @include m.rounded(7rem);

        object-fit: cover;

        border: 2px solid v.$accent;
    }

    &__name {
        font-size: 1.25rem;
        font-weight: 500;
    }

    &__pseudo {
        font-size: 0.875rem;
        color: v.$very-dark-gray;
    }

    &__profile-stats {
        &__stat {
            margin-left: 1rem;

            &__number {
                font-weight: 700;
            }
        }

        & &__stat:first-child {
            margin-left: 0;
        }
    }

    &__description {
        white-space: pre-line;
        color: v.$grayish-black;
    }

    &__gyms {
        @extend %default-box;

        padding: 1.5rem;

        &__list {
            margin-top: 1rem;

            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
        }
    }

    &__posts {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        &__empty {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;

            &__text {
                font-size: 1.125rem;
            }
        }
    }
}
</style>
