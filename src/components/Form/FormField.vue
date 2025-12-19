<script setup lang="ts">
defineOptions({
    inheritAttrs: false
});

defineProps<{ id?: string; label: string; type?: string; error?: string }>();

const model = defineModel<string | number | undefined>();
</script>

<template>
    <div class="form-field">
        <label :for="id" class="form-field__label">{{ label }}</label>
        <slot>
            <textarea
                v-if="type === 'textarea'"
                :id="id"
                v-model="model"
                :="$attrs"
                class="form-field__textarea"
            />
            <input
                v-else
                :id="id"
                v-model="model"
                :="$attrs"
                :type="type"
                class="form-field__input"
            />
        </slot>
        <span v-if="error" class="form-field__error">{{ error }}</span>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.form-field {
    &__label,
    &__error {
        width: fit-content;

        margin-left: 0.25rem;
    }

    &__label {
        font-size: 0.875rem;
        color: v.$very-dark-gray;

        display: inline-block;

        margin-bottom: 0.5rem;
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
        resize: vertical;

        padding: 0.5rem 1rem;
    }

    &__error {
        font-size: 0.875rem;
        font-weight: 300;
        color: v.$accent;
    }
}
</style>
