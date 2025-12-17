<script setup lang="ts">
import { BOULDER_GRADE_REG_EXPS, ROUTE_GRADE_REG_EXPS } from '@/constants/regExps';
import { BoulderGradeSystemToString } from '@/enums/BoulderGradeSystem';
import type { TClimbStyle } from '@/enums/ClimbStyle';
import ClimbStyle, { ClimStyleToString } from '@/enums/ClimbStyle';
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
    let hasError = false;

    // Check name
    if (!newRoute.value.name || newRoute.value.name.trim().length === 0) {
        errors.value.name = 'Le nom de la voie est obligatoire.';
        hasError = true;
    }

    // Check type
    if (!newRoute.value.type) {
        errors.value.type = 'Veuillez sélectionner un type.';
        hasError = true;
    }

    // Check grade
    else {
        if (!newRoute.value.grade) {
            errors.value.name = 'La cotation est obligatoire.';
            hasError = true;
        } else if (newRoute.value.type === RouteType.Route) {
            if (!ROUTE_GRADE_REG_EXPS[gradeSystemStore.route].test(newRoute.value.grade)) {
                errors.value.name = `La cotation est invalide, veuillez entrer une cotation du système ${
                    RouteGradeSystemToString[gradeSystemStore.route]
                }.`;
                hasError = true;
            }
        } else if (!BOULDER_GRADE_REG_EXPS[gradeSystemStore.boulder].test(newRoute.value.grade)) {
            errors.value.name = `La cotation est invalide, veuillez entrer une cotation du système ${
                BoulderGradeSystemToString[gradeSystemStore.boulder]
            }.`;
            hasError = true;
        }
    }

    // Check location
    if (!newRoute.value.location || newRoute.value.location.trim().length === 0) {
        errors.value.location = 'La localisation de la voie est obligatoire.';
        hasError = true;
    }

    // Check length
    if (!newRoute.value.length) {
        errors.value.length = 'La longueur de la voie est obligatoire.';
        hasError = true;
    } else if (newRoute.value.length <= 0) {
        errors.value.length = 'La longueur de la voie ne peut pas être inférieur ou égale à 0.';
        hasError = true;
    }

    if (hasError) return;

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
    <form class="route-form" @submit.prevent="handleSubmit">
        <div class="route-form__main">
            <!-- Nom -->
            <div class="route-form__field">
                <label for="name" class="route-form__label">Nom</label>
                <input
                    id="name"
                    v-model="newRoute.name"
                    type="text"
                    class="route-form__input"
                    placeholder="Nom de la voie"
                />
                <span v-if="errors.name" class="route-form__error">{{ errors.name }}</span>
            </div>

            <!-- Type -->
            <div class="route-form__field">
                <label class="route-form__label">Type</label>
                <CustomSelect
                    v-slot="{ item }"
                    :options="Object.values(RouteType)"
                    :selected="newRoute.type"
                    placeholder="Sélectionnez un type de voie"
                    @select="handleSelectType"
                >
                    {{ RouteTypeToString[item] }}
                </CustomSelect>
                <span v-if="errors.type" class="route-form__error">{{ errors.type }}</span>
            </div>

            <!-- Cotation -->
            <div class="route-form__field">
                <label for="grade" class="route-form__label">Cotation</label>
                <input
                    id="grade"
                    v-model="newRoute.grade"
                    type="text"
                    class="route-form__input"
                    :placeholder="cotationPlaceholder"
                />
                <span v-if="errors.grade" class="route-form__error">{{ errors.grade }}</span>
            </div>

            <!-- Localisation -->
            <div class="route-form__field">
                <label for="location" class="route-form__label">Localisation</label>
                <input
                    id="location"
                    v-model="newRoute.location"
                    type="text"
                    class="route-form__input"
                    placeholder="Lieu où se situe la voie (ex: Fontainebleau, France)"
                />
                <span v-if="errors.location" class="route-form__error">{{ errors.location }}</span>
            </div>

            <!-- Length -->
            <div class="route-form__field">
                <label for="length" class="route-form__label">Longueur</label>
                <input
                    id="length"
                    v-model="newRoute.length"
                    type="number"
                    class="route-form__input"
                    min="0"
                    step="0.1"
                    placeholder="Longueur de la voie (en m)"
                />
                <span v-if="errors.length" class="route-form__error">{{ errors.length }}</span>
            </div>

            <!-- Styles -->
            <div class="route-form__field">
                <label for="styles" class="route-form__label">Styles</label>
                <CustomSelect
                    v-slot="{ item }"
                    :options="Object.values(ClimbStyle)"
                    :selected="newRoute.styles ?? []"
                    placeholder="Sélectionnez un type de voie"
                    options-before
                    @select="handleAddStyle"
                    @remove="handleRemoveStyle"
                >
                    {{ ClimStyleToString[item] }}
                </CustomSelect>
                <span v-if="errors.styles" class="route-form__error">{{ errors.styles }}</span>
            </div>
        </div>

        <!-- Actions -->
        <div class="route-form__bottom">
            <button
                type="button"
                class="route-form__bottom__btn route-form__bottom__btn--cancel"
                @click="$emit('end')"
            >
                Annuler
            </button>
            <button type="submit" class="route-form__bottom__btn route-form__bottom__btn--confirm">
                Créer
            </button>
        </div>
    </form>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.route-form {
    min-width: 650px;

    &__main {
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__label {
        font-size: 0.875rem;
        color: v.$very-dark-gray;

        display: inline-block;

        margin-bottom: 8px;
    }

    &__error {
        font-size: 0.875rem;
        font-weight: 300;
        color: v.$accent;
    }

    &__input {
        width: 100%;

        padding: 1rem 1.5rem;

        @extend %default-border;
        border-radius: 0.5rem;
        outline-color: v.$accent;
        
        &::placeholder {
            color: v.$dark-gray;
        }
    }

    &__bottom {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        align-items: center;

        padding: 1rem;

        border-top: 1px solid v.$light-gray;

        background-color: v.$grayish-white;

        &__btn {
            cursor: pointer;

            padding: 0.75rem 1.5rem;

            border: none;
            border-radius: 0.625rem;

            background-color: transparent;

            &--cancel {
                color: v.$grayish-black;

                transition: background-color 0.3s ease;

                &:hover {
                    background-color: v.$light-gray;
                }
            }

            &--confirm {
                background-image: v.$main-gradient;

                color: v.$white;

                &:hover {
                    background-image: v.$main-gradient-lighten;
                }
            }
        }
    }
}
</style>
