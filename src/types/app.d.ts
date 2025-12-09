/**
 * Représente une image avec des métadonnées.
 *
 * @export
 * @interface ImageFile
 */
export interface ImageFile {
    /**
     * L'identifiant unique.
     *
     * @type {string}
     * @memberof ImageFile
     */
    id: string;

    /**
     * Le fichier réel.
     *
     * @type {File}
     * @memberof ImageFile
     */
    file: File;

    /**
     * L'URL de prévisualisation de l'image.
     *
     * @type {string}
     * @memberof ImageFile
     */
    preview: string;
}

export type Errors<T> = {
    [K in keyof T]?: string;
};
