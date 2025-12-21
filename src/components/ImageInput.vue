<script setup lang="ts">
import { GalleryOutlined, XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { useTemplateRef } from 'vue';

defineProps<{ id: string; image: string | undefined }>();

const emit = defineEmits<{
    add: [string];
    remove: [];
}>();

const inputRef = useTemplateRef('input');

function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        emit('add', URL.createObjectURL(target.files[0]!));
    }
}

function handleRemove() {
    if (inputRef.value) {
        // Clear input
        inputRef.value.value = '';
    }
    emit('remove');
}
</script>

<template>
    <input
        :id="id"
        ref="input"
        type="file"
        class="image-input__input"
        accept=".png,.jpeg,.jpg"
        @change="handleChange"
    />

    <label :for="id" class="image-input__label">
        <div v-if="image" class="image-input__preview">
            <div class="image-input__preview__image">
                <img :src="image" alt="Image importée" class="image-input__preview__image__img" />
                <button
                    type="button"
                    class="image-input__preview__image__remove"
                    title="Supprimer l'image"
                    @mousedown.stop="handleRemove()"
                >
                    <Lineicons :icon="XmarkOutlined" />
                </button>
            </div>
        </div>
        <div v-else class="image-input__text">
            <Lineicons :icon="GalleryOutlined" class="image-input__text__icon" />
            <span class="image-input__text__main">Cliquez pour ajouter une image</span>
            <span class="image-input__text__secondary">PNG, JPG jusqu'à 10MB</span>
        </div>
    </label>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.image-input {
    &__input {
        display: none;
    }

    &__label {
        padding: 2rem 1rem;

        display: block;

        border: 2px dashed v.$light-gray;
        border-radius: 0.5rem;

        cursor: pointer;

        transition: border-color 0.3s ease;

        @include m.hover() {
            border-color: v.$accent;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__icon {
            @include m.size(3rem);

            color: v.$dark-gray;

            margin-bottom: 0.5rem;
        }

        &__main {
            font-size: 0.875rem;
            color: v.$very-dark-gray;
        }

        &__secondary {
            display: inline-block;

            margin-top: 0.25rem;

            font-size: 0.75rem;
            color: v.$dark-gray;
        }
    }

    &__preview {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        justify-content: center;

        &__image {
            @extend %default-border;
            border-radius: 0.5rem;

            position: relative;

            @extend %flex-center;

            &__img {
                $size: 175px;

                @include m.size(175px, auto);
                max-height: 175px;

                object-fit: contain;
            }

            &__remove {
                aspect-ratio: 1/1;

                padding: 0.125rem;

                cursor: pointer;

                position: absolute;
                top: 0;
                right: 0;
                transform: translate(50%, -50%);

                background-color: v.$light-gray;

                border: 1px solid v.$dark-gray;
                border-radius: 50%;

                color: v.$dark-gray;

                @extend %flex-center;

                @include m.transition-group(0.3s, ease, background-color, border-color, color);

                @include m.hover() {
                    background-color: v.$light-red;

                    border-color: v.$red;

                    color: v.$red;
                }
            }
        }
    }
}
</style>
