<script setup lang="ts">
defineProps<{ tabs: string[]; currentTab: string; displayRecord?: Record<string, string> }>();

defineEmits<{
    change: [string];
}>();
</script>

<template>
    <div class="tabs">
        <button
            v-for="tab in tabs"
            :key="tab"
            class="tabs__tab"
            :class="{ 'tabs__tab--active': currentTab === tab }"
            @click="$emit('change', tab)"
        >
            {{ displayRecord ? displayRecord[tab] : tab }}
        </button>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.tabs {
    display: flex;
    gap: 1.375rem;
    align-items: center;

    margin-bottom: 1rem;

    &__tab {
        border: none;

        background-color: transparent;

        font-size: 1.125rem;
        font-weight: 500;

        position: relative;

        cursor: pointer;

        &::after {
            content: '';

            @include m.size(100%, 0);

            position: absolute;
            bottom: -3px;
            left: 0;

            background-color: v.$accent;

            border-radius: 9999px;

            transition: height 0.3s ease;
        }

        &--active,
        &:hover {
            &::after {
                height: 3px;
            }
        }
    }
}
</style>
