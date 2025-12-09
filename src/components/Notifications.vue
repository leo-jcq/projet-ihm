<script setup lang="ts">
import useOpen from '@/composables/useOpen';
import dataStore from '@/stores/data';
import { dateToSince } from '@/utils/time';
import { Bell1Outlined, XmarkOutlined } from '@lineiconshq/free-icons';
import { Lineicons } from '@lineiconshq/vue-lineicons';
import { computed, useTemplateRef } from 'vue';
import GlassBtn from './GlassBtn.vue';

const notificationsRef = useTemplateRef('notifications');

const { isOpen, toggle, close } = useOpen(notificationsRef);

const sortedNotifications = computed(() =>
    dataStore.notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
);
const hasNewNotifications = computed(() => dataStore.notifications.some((notif) => !notif.read));

function deleteNotification(id: number) {
    dataStore.notifications = dataStore.notifications.filter((notif) => notif.id !== id);
}
</script>

<template>
    <div ref="notifications" class="notifications">
        <GlassBtn @click="toggle">
            <Lineicons :icon="Bell1Outlined" />
            <span v-if="hasNewNotifications" class="notifications__tooltip" />
        </GlassBtn>

        <Transition name="notifications__content">
            <div v-if="isOpen" class="notifications__content">
                <div class="notifications__header">
                    <h3 class="notifications__header__title">Notifications</h3>
                    <GlassBtn class="notifications__close" title="Fermer" @click="close">
                        <Lineicons :icon="XmarkOutlined" class="notifications__icon" />
                    </GlassBtn>
                </div>

                <div class="notifications__list">
                    <p v-if="sortedNotifications.length === 0" class="notifications__empty">
                        Aucune notification
                    </p>
                    <div
                        v-for="notif in sortedNotifications"
                        :key="notif.id"
                        :class="[
                            'notifications__notification',
                            { 'notifications__notification--unread': !notif.read }
                        ]"
                        @mouseenter="notif.read = true"
                    >
                        <div class="notifications__notification__content">
                            <p class="notifications__notification__text">{{ notif.content }}</p>
                            <time class="notifications__notification__time">
                                {{ dateToSince(notif.timestamp) }}
                            </time>
                        </div>
                        <GlassBtn
                            class="notifications__notification__delete"
                            title="Supprimer la notification"
                            @click.stop="deleteNotification(notif.id)"
                        >
                            <Lineicons :icon="XmarkOutlined" />
                        </GlassBtn>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;
@use '@/scss/placeholders';

.notifications {
    position: relative;

    &__tooltip {
        @include m.rounded(0.5rem);

        position: absolute;
        top: 10%;
        right: 10%;

        background-color: v.$accent;
    }

    &__content {
        min-width: 350px;
        max-height: 400px;

        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        z-index: 80;

        border-radius: 0.75rem;
        background-color: v.$white;

        @extend %bigger-shadow;

        display: flex;
        flex-direction: column;

        overflow: hidden;

        &-enter-active,
        &-leave-active {
            transition-property: opacity, transform;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
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

    &__header {
        @extend %flex-between;

        padding: 1rem;

        border-bottom: 1px solid v.$light-gray;

        &__title {
            font-size: 1rem;
            font-weight: 600;
            color: v.$grayish-black;
        }
    }

    &__close {
        @include m.size(2rem);
    }

    &__empty {
        @extend %flex-center;

        padding: 2rem 1rem;

        font-size: 0.875rem;
        text-align: center;
        color: v.$dark-gray;
    }

    &__list {
        overflow-y: auto;
    }

    &__notification {
        @extend %flex-between;

        padding: 1rem;

        border-bottom: 1px solid v.$very-light-gray;

        transition: background-color 0.2s ease;

        &:hover {
            background-color: v.$very-light-gray;
        }

        &--unread {
            background-color: rgba(v.$accent, 0.1);
        }

        &__content {
            margin-right: 0.5rem;
        }

        &__text {
            margin-bottom: 0.25rem;

            font-size: 0.875rem;
            color: v.$grayish-black;
        }

        &__time {
            font-size: 0.75rem;
            color: v.$dark-gray;
        }

        &__delete {
            @include m.size(1.75rem);

            padding: 0.25rem;

            opacity: 0;

            &:hover {
                background-color: v.$light-gray;
            }
        }

        &:hover &__delete {
            opacity: 1;
        }
    }
}
</style>
