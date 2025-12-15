import { ref, watch, type Ref } from 'vue';

/**
 * Composable pour utiliser une référence liée à une valeur dans le localStorage.
 *
 * @export
 * @template T - Le type de la valeur stockée.
 * @param {string} key - La clé utilisée pour accéder à la valeur dans le localStorage.
 * @param {T} defaultValue - La valeur par défaut si aucune valeur n'est trouvée dans le localStorage.
 * @return {Ref<T>} Une référence Vue contenant la valeur du localStorage ou la valeur par défaut.
 */
export default function useLocalStorageRef<T>(key: string, defaultValue: T): Ref<T> {
    const storedValue = localStorage.getItem(key);

    const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue);

    watch(
        value,
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        },
        { deep: true }
    );

    return value as Ref<T>;
}
