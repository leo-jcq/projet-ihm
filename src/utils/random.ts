/**
 * Génère un nombre aléatoire.
 *
 * @export
 * @param {number} [min=0] - Valeur minimale.
 * @param {number} [max=Number.MAX_SAFE_INTEGER] - Valeur maximale.
 * @return {number} Un nombre aléatoire entre {@link min} et {@link max}.
 */
export function getRandomNumber(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) * 100) / 100 + min;
}

/**
 * Génère un entier aléatoire.
 *
 * @export
 * @param {number} [min=0] - Valeur minimale.
 * @param {number} [max=Number.MAX_SAFE_INTEGER] - Valeur maximale.
 * @return {number} Un entier aléatoire entre {@link min} et {@link max}.
 */
export function getRandomInt(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
