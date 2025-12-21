<script setup lang="ts">
import { ROUTE_GRADE_REG_EXPS } from '@/constants/regExps';
import Availability, { AvailabilityToString, type TAvailability } from '@/enums/Availability';
import { RouteGradeSystemToString } from '@/enums/RouteGradeSystem';
import RouteType, { RouteTypeToString, type TRouteType } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import gradeSystemStore from '@/stores/gradeSystem';
import userStore from '@/stores/user';
import type { Errors } from '@/types/app.d';
import type {  User } from '@/types/model.d';
import { convertRouteGradeToFrench } from '@/utils/grades';
import { computed, onMounted, ref } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import Form from '../Form/Form.vue';
import FormField from '../Form/FormField.vue';
import GymBox from '../Gyms/GymBox.vue';
import ImageInput from '../ImageInput.vue';

const emit = defineEmits<{ close: [] }>();

// Formulaire
const formData = ref<Omit<User, 'avatar'> & { avatar?: string }>({ ...userStore.user });
const errors = ref<Errors<User>>({});

onMounted(() => {
    formData.value = { ...userStore.user };
});

// Avatar
/**
 * Met à jour l'avatar.
 *
 * @param {string} newImage - La nouvelle image.
 */
function updateAvatar(newImage: string) {
    formData.value.avatar = newImage;
}

/**
 * Supprime l'avatar.
 */
function removeAvatar() {
    if (formData.value.avatar) {
        URL.revokeObjectURL(formData.value.avatar);
        formData.value.avatar = undefined;
    }
}

// Styles
function handleAddStyle(style: TRouteType) {
    formData.value.styles.push(style);
}

function handleRemoveStyle(style: TRouteType) {
    formData.value.styles = formData.value.styles.filter((s) => s !== style);
}

// Disponibilités
function handleAddAvailability(availability: TAvailability) {
    formData.value.availabilities.push(availability);
}

function handleRemoveAvailability(availability: TAvailability) {
    formData.value.availabilities = formData.value.availabilities.filter((a) => a !== availability);
}

// Salles
const gymIds = computed(() => dataStore.gyms.map((g) => g.id));

function handleAddGym(gymId: number) {
    formData.value.gymsIds.push(gymId);
}

function handleRemoveGym(gymId: number) {
    formData.value.gymsIds = formData.value.gymsIds.filter((g) => g !== gymId);
}

// Submit
function handleSubmit() {
    // Check name
    if (!formData.value.name || formData.value.name.trim().length === 0) {
        errors.value.name = 'Le nom est obligatoire.';
    } else {
        errors.value.name = undefined;
    }

    // Check pseudo
    if (!formData.value.pseudo || formData.value.pseudo.trim().length === 0) {
        errors.value.pseudo = 'Le pseudo est obligatoire.';
    } else {
        if (formData.value.pseudo.startsWith('@')) {
            formData.value.pseudo = formData.value.pseudo.substring(1);
        }
        errors.value.name = undefined;
    }

    // Check age
    if (typeof formData.value.age !== 'number') {
        formData.value.age = undefined;
        errors.value.age = undefined;
    } else if (formData.value.age <= 0) {
        errors.value.age = "Ls'âge ne peut pas être inférieur ou égale à 0.";
    }

    // Check level
    if (!formData.value.level || formData.value.level?.trim() === '') {
        formData.value.level = undefined;
        errors.value.level = undefined;
    } else if (!ROUTE_GRADE_REG_EXPS[gradeSystemStore.route].test(formData.value.level)) {
        errors.value.level = `Le niveau est invalide, veuillez entrer une cotation du système ${
            RouteGradeSystemToString[gradeSystemStore.route]
        }.`;
    } else {
        errors.value.level = undefined;
    }

    if (Object.values(errors.value).filter((e) => !!e).length > 0) return;

    userStore.user = {
        id: formData.value.id,
        followed: true,
        name: formData.value.name,
        age: formData.value.age,
        pseudo: formData.value.pseudo,
        description: formData.value.description,
        avatar: formData.value.avatar ?? `${import.meta.env.BASE_URL}default_pfp.png`,
        level: formData.value.level
            ? convertRouteGradeToFrench(formData.value.level, gradeSystemStore.route)
            : undefined,
        styles: formData.value.styles,
        gymsIds: formData.value.gymsIds,
        availabilities: formData.value.availabilities
    };
    emit('close');
}
</script>

<template>
    <Form
        title="Modifier le profil"
        submit-text="Sauvegarder les modifications"
        @cancel="$emit('close')"
        @submit="handleSubmit"
    >
        <!-- Avatar -->
        <FormField id="avatar" label="Avatar" :error="errors.avatar">
            <ImageInput
                id="avatar"
                :image="formData.avatar"
                @add="updateAvatar"
                @remove="removeAvatar"
            />
        </FormField>

        <div class="user-edit-form__group">
            <!-- Nom -->
            <FormField
                id="name"
                v-model="formData.name"
                label="Nom"
                type="text"
                :error="errors.name"
                placeholder="ex: John Doe"
            />

            <!-- Pseudo -->
            <FormField
                id="pseudo"
                v-model="formData.pseudo"
                label="Pseudo"
                type="text"
                :error="errors.pseudo"
                placeholder="ex: john-doe"
            />
        </div>

        <div class="user-edit-form__group">
            <!-- Age -->
            <FormField
                id="age"
                v-model="formData.age"
                label="Âge"
                type="number"
                :error="errors.age"
                placeholder="ex: 25"
            />

            <!-- Niveau -->
            <FormField
                id="level"
                v-model="formData.level"
                label="Niveau"
                type="text"
                :error="errors.level"
                placeholder="Niveau"
            />
        </div>

        <!-- Description -->
        <FormField
            id="description"
            v-model="formData.description"
            label="Description"
            type="textarea"
            :error="errors.description"
            placeholder="Description"
        />

        <!-- Styles -->
        <FormField label="Styles" :error="errors.styles">
            <CustomSelect
                v-slot="{ item }"
                :options="Object.values(RouteType)"
                :selected="formData.styles"
                placeholder="Sélectionnez la ou les discipline(s) que vous pratiquez"
                options-before
                @select="handleAddStyle"
                @remove="handleRemoveStyle"
            >
                {{ RouteTypeToString[item] }}
            </CustomSelect>
        </FormField>

        <!-- Salles -->
        <FormField label="Salles fréquentée" :error="errors.gymsIds">
            <CustomSelect
                :options="gymIds"
                :selected="formData.gymsIds"
                placeholder="Sélectionnez les salles d'escalade que vous fréquentez"
                options-before
                @select="handleAddGym"
                @remove="handleRemoveGym"
            >
                <template #list-item="{ item }">
                    <GymBox :id="item" interactive />
                </template>

                <template #selected-item="{ item }">
                    <GymBox :id="item" class="user-edit-form__gym-box" />
                </template>
            </CustomSelect>
        </FormField>

        <!-- Disponibilités -->
        <FormField label="Disponibilités" :error="errors.availabilities">
            <CustomSelect
                v-slot="{ item }"
                :options="Object.values(Availability)"
                :selected="formData.availabilities"
                placeholder="Sélectionnez vos disponibilités (pour les matchs)"
                options-before
                @select="handleAddAvailability"
                @remove="handleRemoveAvailability"
            >
                {{ AvailabilityToString[item] }}
            </CustomSelect>
        </FormField>
    </Form>
</template>

<style lang="scss">
.user-edit-form {
    &__group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    &__gym-box {
        border: none;

        box-shadow: none;

        padding: 0;
    }
}
</style>
