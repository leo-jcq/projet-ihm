<script setup lang="ts">
import { XmarkOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import GlassBtn from './GlassBtn.vue';

defineProps<{ title: string }>();

defineEmits<{ close: [] }>();
</script>

<template>
    <Teleport to="body">
        <div class="pop-up" @click="$emit('close')">
            <div class="pop-up__content" @click.stop>
                <div class="pop-up__content__top">
                    <h2 class="pop-up__title">{{ title }}</h2>
                    <GlassBtn class="pop-up__close" @click="$emit('close')">
                        <Lineicons :icon="XmarkOutlined" class="pop-up__close__icon" />
                    </GlassBtn>
                </div>

                <div class="pop-up__content__main">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.pop-up {
    position: fixed;
    z-index: 90;
    inset: 0;

    background-color: rgba(v.$black, 0.65);
    backdrop-filter: blur(2px);

    &__content {
        @include m.max-size(95vw, 95vh);

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        transform-origin: center;

        background-color: v.$white;

        overflow: auto;

        border-radius: 1rem;

        animation: pop-appear 0.3s ease-in-out;

        &__top {
            @extend %flex-between;

            padding: 1rem;

            border-bottom: 1px solid v.$light-gray;
        }
    }

    &__title {
        font-size: 1rem;
        font-weight: 400;
    }

    &__close {
        &__icon {
            @include m.size(1.25rem);
        }
    }
}

@keyframes pop-appear {
    0% {
        transform: translate(-50%, -50%) scale(0);

        opacity: 0;
    }

    100% {
        transform: translate(-50%, -50%) scale(1);

        opacity: 1;
    }
}
</style>
