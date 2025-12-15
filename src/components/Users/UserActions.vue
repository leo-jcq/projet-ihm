<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import userStore from '@/stores/user';
import {
    ExitOutlined,
    EyeOutlined,
    Gear1Outlined,
    User4Outlined,
    XmarkOutlined
} from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { useTemplateRef } from 'vue';
import GlassBtn from '../GlassBtn.vue';
import UserModal from './UserModal.vue';

const userActionsRef = useTemplateRef('user-actions');
const { isOpen, toggle, close } = useOpen(userActionsRef);
</script>

<template>
    <div ref="user-actions" class="user-actions">
        <GlassBtn @click="toggle">
            <Lineicons :icon="User4Outlined" />
        </GlassBtn>

        <Transition name="user-actions">
            <div v-if="isOpen" class="user-actions__content">
                <div class="user-actions__header">
                    <UserModal :user="userStore.user!" link />

                    <GlassBtn class="user-actions__close" title="Fermer" @click="close">
                        <Lineicons :icon="XmarkOutlined" />
                    </GlassBtn>
                </div>

                <div class="user-actions__menu">
                    <RouterLink :to="`/users/${userStore.user!.id}`" class="user-actions__item">
                        <Lineicons :icon="EyeOutlined" class="user-actions__item__icon" />
                        <span class="user-actions__item__text">Voir le profil</span>
                    </RouterLink>

                    <RouterLink to="/settings" class="user-actions__item">
                        <Lineicons :icon="Gear1Outlined" class="user-actions__item__icon" />
                        <span class="user-actions__item__text">Paramètres</span>
                    </RouterLink>

                    <hr class="user-actions__divider" />

                    <button
                        class="user-actions__item user-actions__item--danger"
                        title="Se déconnecter"
                    >
                        <Lineicons :icon="ExitOutlined" class="user-actions__item__icon" />
                        <span class="user-actions__item__text">Se déconnecter</span>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;
@use '@/scss/placeholders';

.user-actions {
    position: relative;

    &__content {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 1000;

        margin-top: 0.5rem;

        min-width: 280px;

        border-radius: 0.75rem;
        background-color: v.$white;

        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;

        overflow: hidden;
    }

    &__header {
        @extend %flex-between;

        padding: 1rem;

        border-bottom: 1px solid v.$light-gray;

        background-color: rgba($color: v.$accent, $alpha: 0.1);
    }

    &__close {
        @include m.size(1.75rem);

        padding: 0.25rem;

        &:hover {
            background-color: v.$dark-gray;
        }
    }

    &__menu {
        padding: 0.5rem 0;
    }

    &__item {
        width: 100%;

        @extend %flex-between;
        gap: 0.75rem;

        padding: 0.75rem 1rem;

        border: none;

        background-color: transparent;

        cursor: pointer;

        text-decoration: none;
        color: v.$grayish-black;

        transition: background-color 0.2s ease;

        &:hover {
            background-color: v.$very-light-gray;
        }

        &__text {
            flex: 1;
            text-align: left;
            font-size: 0.875rem;
        }

        &--danger {
            color: v.$red;

            &:hover {
                background-color: rgba(v.$red, 0.05);
            }
        }
    }

    &__divider {
        margin: 0.5rem 0;

        border: none;
        border-top: 1px solid v.$light-gray;
    }

    &-enter-active,
    &-leave-active {
        @include m.transition-group(0.2s, ease-in-out, opacity, transform);
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
