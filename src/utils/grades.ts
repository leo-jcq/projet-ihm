import { FONTAINEBLEAU_TO_VGRADE, FRENCH_TO_UIAA, FRENCH_TO_USA } from '@/constants/grades';
import type { TBoulderGradeSystem } from '@/enums/BoulderGradeSystem';
import BoulderGradeSystem from '@/enums/BoulderGradeSystem';
import type { TRouteGradeSystem } from '@/enums/RouteGradeSystem';
import RouteGradeSystem from '@/enums/RouteGradeSystem';

/**
 * Convertis une cotation de voie française vers une cotation d'un autre système.
 *
 * @export
 * @param {string} grade - La cotation française à convertir.
 * @param {TRouteGradeSystem} to - Le système de cotation cible.
 * @return {string} La cotation convertie.
 */
export function convertRouteGradeFromFrench(grade: string, to: TRouteGradeSystem): string {
    // Initialisation de la table de conversion
    let convertTable: [string, string][] | null = null;

    // Normalisation de la cotation
    grade = grade.toLowerCase();

    // Sélection de la table de conversion en fonction du système cible
    switch (to) {
        case RouteGradeSystem.UIAA:
            convertTable = FRENCH_TO_UIAA;
            break;
        case RouteGradeSystem.USA:
            convertTable = FRENCH_TO_USA;
    }

    if (convertTable) {
        // Recherche de la cotation dans la table de conversion
        for (let i = 0; i < convertTable.length; i++) {
            const [french, conversion] = convertTable[i]!;
            if (french === grade) {
                return conversion;
            }
        }
    }

    // Retourne la cotation originale si aucune conversion n'a été trouvée
    return grade;
}

/**
 * Convertis une cotation de voie d'un autre système vers une cotation française.
 *
 * @export
 * @param {string} grade - La cotation à convertir.
 * @param {TRouteGradeSystem} from - Le système de cotation source.
 * @return {string} La cotation convertie.
 */
export function convertRouteGradeToFrench(grade: string, from: TRouteGradeSystem): string {
    // Initialisation de la table de conversion
    let convertTable: [string, string][] | null = null;

    // Normalisation de la cotation
    grade = grade.toLowerCase();

    // Sélection de la table de conversion en fonction du système cible
    switch (from) {
        case RouteGradeSystem.UIAA:
            convertTable = FRENCH_TO_UIAA;
            break;
        case RouteGradeSystem.USA:
            convertTable = FRENCH_TO_USA;
    }

    if (convertTable) {
        // Recherche de la cotation dans la table de conversion
        for (let i = 0; i < convertTable.length; i++) {
            const [french, conversion] = convertTable[i]!;
            if (conversion === grade) {
                return french;
            }
        }
    }

    // Retourne la cotation originale si aucune conversion n'a été trouvée
    return grade;
}

/**
 * Convertis une cotation de bloc Fontainebleau vers une cotation d'un autre système.
 *
 * @export
 * @param {string} grade - La cotation Fontainebleau à convertir.
 * @param {TBoulderGradeSystem} to - Le système de cotation cible.
 * @return {string} La cotation convertie.
 */
export function convertBoulderGradeFromFontainebleau(
    grade: string,
    to: TBoulderGradeSystem
): string {
    // Initialisation de la table de conversion
    let convertTable: [string, string][] | null = null;

    // Normalisation de la cotation
    grade = grade.toLowerCase();

    // Sélection de la table de conversion en fonction du système cible
    switch (to) {
        case BoulderGradeSystem.VGrade:
            convertTable = FONTAINEBLEAU_TO_VGRADE;
    }

    if (convertTable) {
        // Recherche de la cotation dans la table de conversion
        console.log(`base grade : ${grade}`);
        for (let i = 0; i < convertTable.length; i++) {
            const [fontainebleau, conversion] = convertTable[i]!;
            console.log(`fontainebleau grade : ${fontainebleau}, conversion : ${conversion}`);
            if (fontainebleau === grade) {
                return conversion;
            }
        }
    }

    // Retourne la cotation originale si aucune conversion n'a été trouvée
    return grade;
}

/**
 * Convertis une cotation de bloc d'un autre système vers une cotation Fontainebleau.
 *
 * @export
 * @param {string} grade - La cotation à convertir.
 * @param {TBoulderGradeSystem} from - Le système de cotation source.
 * @return {string} La cotation convertie.
 */
export function convertBoulderGradeToFontainebleau(
    grade: string,
    from: TBoulderGradeSystem
): string {
    // Initialisation de la table de conversion
    let convertTable: [string, string][] | null = null;

    // Normalisation de la cotation
    grade = grade.toLowerCase();

    // Sélection de la table de conversion en fonction du système cible
    switch (from) {
        case BoulderGradeSystem.VGrade:
            convertTable = FONTAINEBLEAU_TO_VGRADE;
    }

    if (convertTable) {
        // Recherche de la cotation dans la table de conversion
        for (let i = 0; i < convertTable.length; i++) {
            const [fontainebleau, conversion] = convertTable[i]!;
            if (conversion === grade) {
                return fontainebleau;
            }
        }
    }

    // Retourne la cotation originale si aucune conversion n'a été trouvée
    return grade;
}
