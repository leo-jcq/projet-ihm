<script setup lang="ts">
import { BOULDER_GRADE_REG_EXPS, ROUTE_GRADE_REG_EXPS } from '@/constants/regExps';
import { BoulderGradeSystemToString } from '@/enums/BoulderGradeSystem';
import type { TClimbStyle } from '@/enums/ClimbStyle';
import ClimbStyle, { ClimbStyleToString } from '@/enums/ClimbStyle';
import { RouteGradeSystemToString } from '@/enums/RouteGradeSystem';
import RouteType, { RouteTypeToString, type TRouteType } from '@/enums/RouteType';
import dataStore from '@/stores/data';
import gradeSystemStore from '@/stores/gradeSystem';
import type { Errors } from '@/types/app';
import type { Route } from '@/types/model';
import { generateNumberId } from '@/utils/generateId';
import { convertBoulderGradeToFontainebleau, convertRouteGradeToFrench } from '@/utils/grades';
import { computed, ref } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import Form from '../Form/Form.vue';
import FormField from '../Form/FormField.vue';

const emit = defineEmits<{ end: [] }>();

const newRoute = ref<Partial<Route>>({});
const errors = ref<Errors<Route>>({});

const cotationPlaceholder = computed(() => {
    let placeholder = 'Cotation de la voie';

    if (newRoute.value.type) {
        placeholder += ', système ';
        placeholder +=
            newRoute.value.type === RouteType.Route
                ? RouteGradeSystemToString[gradeSystemStore.route]
                : BoulderGradeSystemToString[gradeSystemStore.boulder];
    } else {
        placeholder += ' (système de cotation sélectionné dans les paramètres)';
    }

    return placeholder;
});

function handleSelectType(newType: TRouteType) {
    newRoute.value.type = newType;
}

function handleAddStyle(style: TClimbStyle) {
    if (!newRoute.value.styles) newRoute.value.styles = [];

    newRoute.value.styles.push(style);
}

function handleRemoveStyle(style: TClimbStyle) {
    if (!newRoute.value.styles) return;

    newRoute.value.styles = newRoute.value.styles.filter((s) => s !== style);
}

function handleSubmit() {
    // Check name
    if (!newRoute.value.name || newRoute.value.name.trim().length === 0) {
        errors.value.name = 'Le nom de la voie est obligatoire.';
    } else {
        errors.value.name = undefined;
    }

    // Check type
    if (!newRoute.value.type) {
        errors.value.type = 'Veuillez sélectionner un type.';
    } else {
        errors.value.type = undefined;

        // Check grade
        if (!newRoute.value.grade) {
            errors.value.grade = 'La cotation est obligatoire.';
        } else if (newRoute.value.type === RouteType.Route) {
            if (!ROUTE_GRADE_REG_EXPS[gradeSystemStore.route].test(newRoute.value.grade)) {
                errors.value.grade = `La cotation est invalide, veuillez entrer une cotation du système ${
                    RouteGradeSystemToString[gradeSystemStore.route]
                }.`;
            }
        } else if (!BOULDER_GRADE_REG_EXPS[gradeSystemStore.boulder].test(newRoute.value.grade)) {
            errors.value.grade = `La cotation est invalide, veuillez entrer une cotation du système ${
                BoulderGradeSystemToString[gradeSystemStore.boulder]
            }.`;
        } else {
            errors.value.grade = undefined;
        }
    }

    // Check location
    if (!newRoute.value.location || newRoute.value.location.trim().length === 0) {
        errors.value.location = 'La localisation de la voie est obligatoire.';
    } else {
        errors.value.location = undefined;
    }

    // Check length
    if (!newRoute.value.length) {
        errors.value.length = 'La longueur de la voie est obligatoire.';
    } else if (typeof newRoute.value.length !== 'number') {
        errors.value.length = 'La longueur de la voie doit être un nombre.';
    } else if (newRoute.value.length <= 0) {
        errors.value.length = 'La longueur de la voie ne peut pas être inférieur ou égale à 0.';
    } else {
        errors.value.length = undefined;
    }

    if (Object.values(errors.value).filter((e) => !!e).length > 0) return;

    // Conversion de la cotation
    const convertedGrade =
        newRoute.value.type! === RouteType.Route
            ? convertRouteGradeToFrench(newRoute.value.grade!, gradeSystemStore.route)
            : convertBoulderGradeToFontainebleau(newRoute.value.grade!, gradeSystemStore.boulder);

    // Ajout au store
    dataStore.routes.unshift({
        id: generateNumberId(),
        name: newRoute.value.name!.trim(),
        type: newRoute.value.type!,
        grade: convertedGrade,
        location: newRoute.value.location!,
        length: newRoute.value.length!,
        styles: newRoute.value.styles ?? []
    });

    // End action
    emit('end');
}
</script>

<template>
    <Form title="Nouvelle voie" submit-text="Créer" @submit="handleSubmit" @cancel="$emit('end')">
        <!-- Nom -->
        <FormField
            id="name"
            v-model="newRoute.name"
            label="Nom"
            type="text"
            :error="errors.name"
            placeholder="Nom de la voie"
        />

        <div class="route-form__group">
            <!-- Type -->
            <FormField label="Type" :error="errors.type">
                <CustomSelect
                    v-slot="{ item }"
                    :options="Object.values(RouteType)"
                    :selected="newRoute.type"
                    placeholder="Sélectionnez un type de voie"
                    @select="handleSelectType"
                >
                    {{ RouteTypeToString[item] }}
                </CustomSelect>
            </FormField>

            <!-- Longueur -->
            <FormField
                id="length"
                v-model="newRoute.length"
                label="Longueur"
                type="number"
                :error="errors.length"
                placeholder="Longueur de la voie (en m)"
            />
        </div>

        <!-- Cotation -->
        <FormField
            id="grade"
            v-model="newRoute.grade"
            label="Cotation"
            type="text"
            :error="errors.grade"
            :placeholder="cotationPlaceholder"
        />

        <!-- Localisation -->
        <FormField
            id="location"
            v-model="newRoute.location"
            label="Localisation"
            type="text"
            :error="errors.location"
            placeholder="Lieu où se situe la voie (ex: Fontainebleau, France)"
        />

        <!-- Styles -->
        <FormField label="Styles" :error="errors.styles">
            <CustomSelect
                v-slot="{ item }"
                :options="Object.values(ClimbStyle)"
                :selected="newRoute.styles ?? []"
                placeholder="Sélectionnez un type de voie"
                options-before
                @select="handleAddStyle"
                @remove="handleRemoveStyle"
            >
                {{ ClimbStyleToString[item] }}
            </CustomSelect>
        </FormField>
    </Form>
</template>

<style lang="scss">
.route-form {
    &__group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
}
</style>
