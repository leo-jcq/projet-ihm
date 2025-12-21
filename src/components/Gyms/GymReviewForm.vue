<script setup lang="ts">
import dataStore from '@/stores/data';
import userStore from '@/stores/user';
import { StarFatBulk, StarFatOutlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { ref } from 'vue';
import Form from '../Form/Form.vue';
import FormField from '../Form/FormField.vue';
import { generateNumberId } from '@/utils/generateId';

const props = defineProps<{ gymId: number }>();

const emit = defineEmits<{ close: [] }>();

const grade = ref(0);
const comment = ref('');

function handleSubmit() {
    if (grade.value === 0) return;

    const trimComment = comment.value.trim();

    dataStore.gymReviews.unshift({
        id: generateNumberId(),
        gymId: props.gymId,
        userId: userStore.user.id,
        grade: grade.value,
        comment: trimComment === '' ? undefined : trimComment
    });

    comment.value = '';

    emit('close');
}
</script>

<template>
    <Form
        title="Rédiger un avis"
        submit-text="Publier"
        @cancel="$emit('close')"
        @submit="handleSubmit"
    >
        <!-- Note -->
        <FormField label="Note">
            <div class="gym-review-form__group">
                <button
                    v-for="g in 5"
                    :key="g"
                    type="button"
                    class="gym-review-form__grade-btn"
                    :class="{ 'gym-review-form__grade-btn--active': g <= grade }"
                    :title="`${g}/5`"
                    @click="grade = grade === g ? 0 : g"
                >
                    <Lineicons
                        :icon="g <= grade ? StarFatBulk : StarFatOutlined"
                        class="gym-review-form__grade-btn__icon"
                    />
                </button>
            </div>
        </FormField>

        <!-- Description -->
        <FormField
            id="comment"
            v-model="comment"
            label="Commentaire"
            type="textarea"
            placeholder="Rédigez votre avis (optionnel)..."
        />
    </Form>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.gym-review-form {
    &__group {
        @extend %flex-center;
        gap: 0.75rem;
    }

    &__grade-btn {
        border: none;

        @extend %flex-center;

        background-color: transparent;

        color: v.$very-dark-gray;

        cursor: pointer;

        &--active {
            color: v.$accent;
        }

        &__icon {
            @include m.size(2rem);
        }
    }
}
</style>
