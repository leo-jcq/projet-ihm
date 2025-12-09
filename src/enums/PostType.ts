import { CheckOutlined, MapPin5Outlined, SignPostLeftOutlined } from '@lineiconshq/free-icons';
import type { IconData } from '@lineiconshq/vue-lineicons';

/**
 * Les types de posts disponibles.
 *
 * @export
 * @enum {string}
 */
const PostType = {
    /**
     * Succès d'un projet.
     */
    Success: 'success',
    /**
     * Projet en cours.
     */
    Project: 'project',
    /**
     * Autre type de post.
     */
    Other: 'other'
} as const;

export default PostType;

export const PostTypeToDisplay: Record<TPostType, { text: string; icon: IconData }> = {
    success: { text: 'Succès', icon: CheckOutlined },
    project: { text: 'Projet', icon: MapPin5Outlined },
    other: { text: 'Autre', icon: SignPostLeftOutlined }
};

export type TPostType = (typeof PostType)[keyof typeof PostType];
