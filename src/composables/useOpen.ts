import { onMounted, onUnmounted, ref, type Ref } from 'vue';

/**
 * Gestion de l'ouverture et fermeture d'un élément.
 *
 * @param {Ref<HTMLElement | null>} [elementRef] - Référence de l'élément à surveiller pour les clics extérieurs.
 * @return {{ isOpen: Ref<boolean>; open: () => void; close: () => void; toggle: () => void }} Méthodes et état d'ouverture.
 */
function useOpen(elementRef?: Ref<HTMLElement | null>): {
    isOpen: Ref<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
} {
    const isOpen = ref(false);

    function open() {
        isOpen.value = true;
    }

    function close() {
        isOpen.value = false;
    }

    function toggle() {
        isOpen.value = !isOpen.value;
    }

    if (elementRef) {
        function handleClickOutside(event: MouseEvent) {
            if (elementRef?.value && !elementRef.value.contains(event.target as Node)) {
                close();
            }
        }

        onMounted(() => {
            document.addEventListener('mousedown', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('mousedown', handleClickOutside);
        });
    }

    return { isOpen, open, close, toggle };
}

export default useOpen;
