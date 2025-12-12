<script setup lang="ts">
import type { ImageFile } from '@/types/app';
import { generateId } from '@/utils/generateId';
import { GalleryOutlined, XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';

defineProps<{ id: string; images: ImageFile[] }>();

const emits = defineEmits<{
    add: [ImageFile[]];
    remove: [string];
}>();

function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        const files = Array.from(target.files);

        emits(
            'add',
            files.map((file) => ({
                id: generateId(),
                file,
                preview: URL.createObjectURL(file)
            }))
        );
    }
}
</script>

<template>
    <input
        :id="id"
        type="file"
        class="image-input__input"
        accept=".png,.jpeg,.jpg"
        multiple
        @change="handleChange"
    />

    <label :for="id" class="image-input__label">
        <div v-if="images.length === 0" class="image-input__text">
            <Lineicons :icon="GalleryOutlined" class="image-input__text__icon" />
            <span class="image-input__text__main">Cliquez pour ajouter une photo</span>
            <span class="image-input__text__secondary">PNG, JPG jusqu'à 10MB</span>
        </div>
        <div v-else class="image-input__images">
            <div v-for="image in images" :key="image.id" class="image-input__images__image">
                <img
                    :src="image.preview"
                    :alt="image.file.name"
                    class="image-input__images__image__img"
                />
                <button
                    class="image-input__images__image__remove"
                    title="Supprimer l'image"
                    @mousedown.stop="$emit('remove', image.id)"
                >
                    <Lineicons :icon="XmarkOutlined" />
                </button>
            </div>
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

        &:hover {
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
        }

        &__secondary {
            display: inline-block;

            margin-top: 0.25rem;

            font-size: 0.75rem;
            color: v.$dark-gray;
        }
    }

    &__images {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;

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

                border-radius: 50%;

                @extend %flex-center;
            }
        }
    }
}
</style>
