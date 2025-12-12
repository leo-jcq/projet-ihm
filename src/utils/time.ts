/**
 * Convertit une date en une chaîne représentant le temps écoulé depuis cette date.
 *
 * @export
 * @param {Date} date - Le date à convertir.
 * @return {string} Une chaîne représentant le temps écoulé.
 */
export function dateToSince(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `à l'instant`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} jour${days > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 31104000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} moi${months > 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(diffInSeconds / 31104000);
        return `${years} an${years > 1 ? 's' : ''}`;
    }
}
