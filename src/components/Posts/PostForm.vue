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
import Form from '../Form/Form.vue';
import FormField from '../Form/FormField.vue';
import ImageInput from '../ImageInput.vue';
import RouteBox from '../Routes/RouteBox.vue';
import RouteForm from '../Routes/RouteForm.vue';
import SearchSelect from '../SearchSelect.vue';
import PostTypeBtn from './PostTypeBtn.vue';

const { isOpen, open, close } = useOpen();
const { isOpen: isRouteFormOpen, open: routeFormOpen, close: routeFormClose } = useOpen();

const newPost = ref<Partial<Post>>({ type: PostType.Success });
const image = ref<ImageFile | null>(null);
const selectedRoute = ref<Route | null>(null);

const errors = ref<Errors<Post>>({});

/**
 * Réinitialise le formulaire et le ferme.
 */
function fullClose() {
    newPost.value = { type: PostType.Success };
    image.value = null;
    selectedRoute.value = null;
    errors.value = {};
    close();
}

/**
 * Change le type de post et met à jour les informations de la voie en conséquence.
 *
 * @param {TPostType} newType - Le nouveau type de post.
 */
function setPostType(newType: TPostType) {
    newPost.value.type = newType;
    if (newType === PostType.Other) {
        newPost.value.routeId = undefined;
        newPost.value.tryCount = undefined;
        selectedRoute.value = null;
    }
}

/**
 * Sélectionne une voie.
 *
 * @param {Route} route - La voie sélectionnée
 */
function selectRoute(route: Route) {
    newPost.value.routeId = route.id;
    selectedRoute.value = route;
}

/**
 * Met à jour l'image.
 *
 * @param newImages - La liste des nouvelles images.
 */
function addImage(newImages: ImageFile[]) {
    image.value = newImages[0] ?? null;
}

/**
 * Supprime l'image.
 */
function removeImage() {
    if (image.value) {
        URL.revokeObjectURL(image.value.preview);
        image.value = null;
    }
}

/**
 * Gère la soumission du formulaire.
 */
function handleSubmit() {
    // Check route id
    if (newPost.value.type !== PostType.Other && !newPost.value.routeId) {
        errors.value.routeId =
            'Veuillez sélectionner une voie, si vous ne la trouvez pas, créez là.';
    } else {
        errors.value.routeId = undefined;
    }

    if (newPost.value.type === PostType.Other) {
        errors.value.tryCount = undefined;

        // Check content
        if (!newPost.value.content || newPost.value.content.trim().length === 0) {
            errors.value.content = 'Le contenu du post obligatoire.';
        } else {
            errors.value.content = undefined;
        }
    } else {
        errors.value.content = undefined;

        // Check number of try
        if (!newPost.value.tryCount) {
            errors.value.tryCount =
                "Veuillez entrer le nombre 'essais que vous avez mis dans la voie.";
        } else if (newPost.value.tryCount <= 0) {
            errors.value.tryCount = "Le nombre d'essais doit être supérieur à 0.";
        } else {
            errors.value.tryCount = undefined;
        }
    }

    if (Object.values(errors.value).filter((e) => !!e).length > 0) return;

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

    fullClose();
}
</script>

<template>
    <button class="post-form__open" @click="open">
        <Lineicons :icon="PlusOutlined" />
        Nouveau post
    </button>

    <Form
        v-if="isOpen"
        title="Nouveau post"
        submit-text="Publier"
        @cancel="fullClose"
        @submit="handleSubmit"
    >
        <!-- Type -->
        <FormField label="Type de post" :error="errors.type">
            <div class="post-form__group">
                <PostTypeBtn
                    v-for="postType in Object.values(PostType)"
                    :key="postType"
                    :type="postType"
                    :active="postType === newPost.type"
                    @click="setPostType(postType)"
                />
            </div>
        </FormField>

        <template v-if="newPost.type !== PostType.Other">
            <!-- Voie -->
            <FormField id="route" label="Voie" :error="errors.routeId">
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

                <span class="post-form__indicator">
                    Vous ne trouvez pas votre voie/bloc ? Ajoutez la/le en cliquant
                    <button type="button" class="post-form__open-route-form" @click="routeFormOpen">
                        ici
                    </button>
                    .
                </span>

                <RouteBox v-if="selectedRoute" :route="selectedRoute" class="post-form__route" />
            </FormField>

            <!-- Nombre d'essais -->
            <FormField
                id="tryCount"
                v-model="newPost.tryCount"
                label="Nombre d'essais"
                type="number"
                :error="errors.tryCount"
                placeholder="Ex : 5"
            />
        </template>

        <!-- Image -->
        <FormField id="image" label="Image" :error="errors.image">
            <ImageInput
                id="image"
                :images="image ? [image] as ImageFile[] : []"
                @add="addImage"
                @remove="removeImage"
            />
        </FormField>

        <!-- Description -->
        <FormField
            id="content"
            v-model="newPost.content"
            label="Description"
            type="textarea"
            :error="errors.content"
            placeholder="Ajoutez une description (optionel)"
            rows="4"
        />
    </Form>

    <RouteForm v-if="isRouteFormOpen" @end="routeFormClose" />
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.post-form {
    &__open {
        @extend %default-btn;
        
        border-radius: 9999px;
    }

    &__group {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    &__indicator {
        width: fit-content;

        font-size: 0.875rem;
        color: v.$dark-gray;

        display: block;

        margin: {
            top: 0.5rem;
            left: 0.25rem;
        }
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
}
</style>
