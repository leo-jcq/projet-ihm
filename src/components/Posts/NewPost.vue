<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import PostType, { type TPostType } from '@/enums/PostType';
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import type { Errors, ImageFile } from '@/types/app';
import type { Post, Route } from '@/types/model';
import { generateNumberId } from '@/utils/generateId';
import { PlusOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';
import ImageInput from '../ImageInput.vue';
import PopUp from '../PopUp.vue';
import RouteBox from '../Routes/RouteBox.vue';
import RouteForm from '../Routes/RouteForm.vue';
import SearchSelect from '../SearchSelect.vue';
import PostTypeBtn from './PostTypeBtn.vue';

const { isOpen, open, close: cClose } = useOpen();
const { isOpen: isRouteFormOpen, open: routeFormOpen, close: routeFormClose } = useOpen();

const newPost = ref<Partial<Post>>({ type: PostType.Success });
const image = ref<ImageFile | null>(null);
const selectedRoute = ref<Route | null>(null);

const errors = ref<Errors<Post>>({});

function close() {
    newPost.value = { type: PostType.Success };
    image.value = null;
    selectedRoute.value = null;
    errors.value = {};
    cClose();
}

function setPostType(newType: TPostType) {
    newPost.value.type = newType;
    if (newType === PostType.Other) {
        newPost.value.routeId = undefined;
        newPost.value.tryCount = undefined;
        selectedRoute.value = null;
    }
}

function handleTryCountChange(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value, 10);
    newPost.value.tryCount = isNaN(value) ? undefined : value;
}

function selectRoute(route: Route) {
    newPost.value.routeId = route.id;
    selectedRoute.value = route;
}

function addImages(newImages: ImageFile[]) {
    image.value = newImages[0] ?? null;
}

function removeImage() {
    if (image.value) {
        URL.revokeObjectURL(image.value.preview);
        image.value = null;
    }
}

function handleSubmit() {
    let hasError = false;

    // Check route id
    if (newPost.value.type !== PostType.Other && !newPost.value.routeId) {
        errors.value.routeId =
            'Veuillez sélectionner une voie, si vous ne la trouvez pas, créez là.';
        hasError = true;
    }

    // Check number of try
    if (newPost.value.type !== PostType.Other && !newPost.value.tryCount) {
        errors.value.tryCount = "Veuillez entrer le nombre 'essais que vous avez mis dans la voie.";
        hasError = true;
    }

    if (hasError) return;

    dataStore.posts.unshift({
        id: generateNumberId(),
        authorId: userStore.user.id,
        type: newPost.value.type!,
        content: newPost.value.content?.trim() ?? '',
        image: image.value?.preview,
        routeId: newPost.value.routeId,
        tryCount: newPost.value.tryCount,
        likes: 0,
        date: "à l'instant"
    });

    close();
}
</script>

<template>
    <button class="new-post__btn" @click="open">
        <Lineicons :icon="PlusOutlined" />
        Nouveau post
    </button>

    <PopUp v-if="isOpen" title="Nouvelle ascension" @close="close">
        <form class="new-post__form" @submit.prevent="handleSubmit">
            <div class="new-post__form__main">
                <!-- Type -->
                <div class="new-post__form__field">
                    <label class="new-post__form__label">Type de post</label>
                    <div class="new-post__form__field__group">
                        <PostTypeBtn
                            v-for="postType in Object.values(PostType)"
                            :key="postType"
                            :type="postType"
                            :active="postType === newPost.type"
                            @click="setPostType(postType)"
                        />
                    </div>
                    <span v-if="errors.type" class="new-post__form__error">{{ errors.type }}</span>
                </div>

                <template v-if="newPost.type !== PostType.Other">
                    <!-- Voie -->
                    <div class="new-post__form__field">
                        <label for="route" class="new-post__form__label">Voie</label>
                        <SearchSelect
                            id="route"
                            v-slot="{ item }"
                            :options="dataStore.routes"
                            :selected="selectedRoute"
                            placeholder="Rechercher une voie..."
                            :search-keys="['name', 'location']"
                            @select="selectRoute"
                        >
                            <RouteBox :route="item" />
                        </SearchSelect>

                        <span class="new-post__form__indicator">
                            Vous ne trouvez pas votre voie/bloc ? Ajoutez la/le en cliquant
                            <button
                                type="button"
                                class="new-post__form__open-route-form"
                                @click="routeFormOpen"
                            >
                                ici
                            </button>
                            .
                        </span>

                        <RouteBox
                            v-if="selectedRoute"
                            :route="selectedRoute"
                            class="new-post__form__route"
                        />
                        <span v-if="errors.routeId" class="new-post__form__error">
                            {{ errors.routeId }}
                        </span>
                    </div>

                    <!-- Nombre d'essais  -->
                    <div class="new-post__form__field">
                        <label for="tryCount" class="new-post__form__label">Nombre d'essais</label>
                        <input
                            id="tryCount"
                            :value="newPost.tryCount"
                            type="number"
                            class="new-post__form__input"
                            placeholder="Ex : 5"
                            min="0"
                            @change="handleTryCountChange"
                        />
                        <span v-if="errors.tryCount" class="new-post__form__error">
                            {{ errors.tryCount }}
                        </span>
                    </div>
                </template>

                <!-- Photos -->
                <div class="new-post__form__field">
                    <label for="photos" class="new-post__form__label">Photo(s)</label>
                    <ImageInput
                        id="photos"
                        :images="image ? [image] : []"
                        @add="addImages"
                        @remove="removeImage"
                    />
                    <span v-if="errors.image" class="new-post__form__error">
                        {{ errors.image }}
                    </span>
                </div>

                <!-- Description -->
                <div class="new-post__form__field">
                    <label for="route" class="new-post__form__label">Description</label>
                    <textarea
                        v-model="newPost.content"
                        class="new-post__form__textarea"
                        placeholder="..."
                        :rows="4"
                    />
                    <span v-if="errors.content" class="new-post__form__error">
                        {{ errors.content }}
                    </span>
                </div>
            </div>

            <!-- Actions -->
            <div class="new-post__form__bottom">
                <button
                    type="button"
                    class="new-post__form__bottom__btn new-post__form__bottom__btn--cancel"
                    @click="close"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    class="new-post__form__bottom__btn new-post__form__bottom__btn--confirm"
                >
                    Publier
                </button>
            </div>
        </form>
    </PopUp>

    <PopUp v-if="isRouteFormOpen" title="Nouvelle voie" @close="routeFormClose">
        <RouteForm @end="routeFormClose" />
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.new-post {
    &__btn {
        background-image: v.$main-gradient;

        padding: 0.5rem 1rem;

        @extend %flex-center;
        gap: 0.5rem;

        border: none;
        border-radius: 9999px;

        cursor: pointer;

        font-size: 1rem;
        color: v.$white;

        &:hover {
            background-image: v.$main-gradient-lighten;
        }
    }

    &__form {
        &__main {
            padding: 1rem;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        &__field {
            &__group {
                display: flex;
                gap: 0.75rem;
                align-items: center;
            }
        }

        &__label {
            font-size: 0.875rem;
            color: v.$very-dark-gray;

            display: inline-block;

            margin-bottom: 8px;
        }

        &__error {
            font-size: 0.875rem;
            font-weight: 300;
            color: v.$accent;
        }

        &__group {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        &__input,
        &__textarea {
            width: 100%;

            @extend %default-border;
            border-radius: 0.5rem;
            outline-color: v.$accent;

            &::placeholder {
                color: v.$dark-gray;
            }
        }

        &__input {
            padding: 1rem 1.5rem;
        }

        &__textarea {
            resize: none;

            padding: 0.5rem 1rem;
        }

        &__indicator {
            font-size: 0.875rem;
            color: v.$dark-gray;

            display: block;

            margin-top: 0.5rem;
        }

        &__open-route-form {
            border: none;

            background-color: transparent;

            color: v.$grayish-black;

            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        &__route {
            margin-top: 0.5rem;
        }

        &__bottom {
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            align-items: center;

            padding: 1rem;

            border-top: 1px solid v.$light-gray;

            background-color: v.$grayish-white;

            &__btn {
                cursor: pointer;

                padding: 0.75rem 1.5rem;

                border: none;
                border-radius: 0.625rem;

                background-color: transparent;

                &--cancel {
                    color: v.$grayish-black;

                    transition: background-color 0.3s ease;

                    &:hover {
                        background-color: v.$light-gray;
                    }
                }

                &--confirm {
                    background-image: v.$main-gradient;

                    color: v.$white;

                    &:hover {
                        background-image: v.$main-gradient-lighten;
                    }
                }
            }
        }
    }
}
</style>
