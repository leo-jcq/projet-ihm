import { onMounted, onUnmounted } from 'vue';

const BASE_TITLE = 'VerticalMeet';

/**
 * Composable pour gérer le titre de la page.
 *
 * @export
 * @param {string} [title] - Le titre à définir pour la page.
 */
export default function usePageTitle(title: string) {
    onMounted(() => {
        document.title = `${title} | ${BASE_TITLE}`;
    });

    onUnmounted(() => {
        document.title = BASE_TITLE;
    });
}
