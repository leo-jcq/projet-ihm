/**
 * Génère un identifiant unique aléatoire.
 *
 * @export
 * @return {string} Un identifiant unique.
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

/**
 * Génère un identifiant numérique aléatoire.
 *
 * @export
 * @return {number} Un identifiant numérique.
 */
export function generateNumberId(): number {
    return Math.floor(Math.random() * 1_000_000);
}
