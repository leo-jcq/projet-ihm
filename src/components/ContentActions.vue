<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import userStore from '@/stores/user';
import { Flag1Outlined, MenuMeatballs1Outlined, Trash3Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { useTemplateRef } from 'vue';
import GlassBtn from './GlassBtn.vue';

withDefaults(
    defineProps<{
        contentId: number;
        userId: number;
        contentName: string;
        contentPronoun?: string;
        mouseOverParent?: boolean;
    }>(),
    {
        mouseOverParent: true,
        contentPronoun: 'le'
    }
);

defineEmits<{ delete: [number] }>();

const contentRef = useTemplateRef('content');
const { isOpen, toggle, close } = useOpen(contentRef);
</script>

<template>
    <div
        ref="content"
        class="content-actions"
        :class="{ 'content-actions--display': mouseOverParent || isOpen }"
    >
        <GlassBtn @click="toggle">
            <Lineicons :icon="MenuMeatballs1Outlined" class="content-actions__open__icon" />
        </GlassBtn>

        <Transition name="content-actions__actions">
            <div v-if="isOpen" class="content-actions__actions">
                <button
                    class="content-actions__action content-actions__action--report"
                    :title="`Signaler ${contentPronoun} ${contentName}`"
                    @click="close"
                >
                    <Lineicons :icon="Flag1Outlined" class="content-actions__action__icon" />
                    Signaler
                </button>
                <button
                    v-if="userId === userStore.user.id"
                    class="content-actions__action content-actions__action--delete"
                    :title="`Supprimer ${contentPronoun} ${contentName}`"
                    @click="$emit('delete', contentId)"
                >
                    <Lineicons :icon="Trash3Outlined" class="content-actions__action__icon" />
                    Supprimer
                </button>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.content-actions {
    position: relative;

    opacity: 0;

    pointer-events: none;

    transition: opacity 0.3s ease;

    &--display {
        opacity: 1;

        pointer-events: auto;
    }

    &__open {
        &__icon {
            transform: rotate(90deg);
        }
    }

    &__actions {
        width: 200px;

        position: absolute;
        top: -1rem;
        right: 0;
        transform: translateY(-100%);

        @extend %default-box;

        padding: 0.5rem 0;

        transform-origin: bottom right;

        &-enter-active,
        &-leave-active {
            transition: opacity 0.2s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }

        &-enter-to,
        &-leave-from {
            opacity: 1;
        }
    }

    &__action {
        width: 100%;

        display: flex;
        gap: 0.754rem;
        align-items: center;

        padding: 0.75rem 1rem;

        border: none;

        background-color: transparent;

        cursor: pointer;

        color: v.$grayish-black;

        transition: background-color 0.2s ease;

        &--report {
            &:hover {
                background-color: v.$very-light-gray;
            }
        }

        &--delete {
            &:hover {
                color: v.$red;

                &:hover {
                    background-color: rgba(v.$red, 0.05);
                }
            }
        }
    }
}
</style>
