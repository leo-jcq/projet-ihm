import type { TPostType } from '@/enums/PostType';
import type { TRouteType } from '@/enums/RouteType';

/**
 * Commentaire sur un post.
 *
 * @export
 * @interface Comment
 */
export interface Comment {
    /**
     * Identifiant unique du commentaire.
     *
     * @type {number}
     * @memberof Comment
     */
    userId: number;
    /**
     * Identifiant du post associé.
     *
     * @type {number}
     * @memberof Comment
     */
    postId: number;
    /**
     * Contenu du commentaire.
     *
     * @type {string}
     * @memberof Comment
     */
    content: string;
    /**
     * Nombre de likes du commentaire.
     *
     * @type {number}
     * @memberof Comment
     */
    likes: number;
    /**
     * Date de création du commentaire.
     *
     * @type {Date}
     * @memberof Comment
     */
    timestamp: Date;
}

/**
 * Salle d'escalade.
 *
 * @interface Gym
 */
interface Gym {
    /**
     * Identifiant unique de la salle.
     *
     * @type {number}
     * @memberof Gym
     */
    id: number;
    /**
     * Nom de la salle.
     *
     * @type {string}
     * @memberof Gym
     */
    name: string;
    /**
     * Localisation de la salle.
     *
     * @type {string}
     * @memberof Gym
     */
    location: string;
}

/**
 * Notification d'un utilisateur.
 *
 * @export
 * @interface Notification
 */
export interface Notification {
    /**
     * Identifiant unique de la notification.
     *
     * @type {number}
     * @memberof Notification
     */
    id: number;
    /**
     * Contenu de la notification.
     *
     * @type {string}
     * @memberof Notification
     */
    content: string;
    /**
     * Indique si la notification a été lue.
     *
     * @type {boolean}
     * @memberof Notification
     */
    read: boolean;
    /**
     * Date de création de la notification.
     *
     * @type {Date}
     * @memberof Notification
     */
    timestamp: Date;
}

/**
 * Post d'un utilisateur.
 *
 * @export
 * @interface Post
 */
export interface Post {
    /**
     * Identifiant unique du post.
     *
     * @type {number}
     * @memberof Post
     */
    id: number;
    /**
     * Identifiant de l'auteur du post.
     *
     * @type {number}
     * @memberof Post
     */
    authorId: number;
    /**
     * Type du post.
     *
     * @type {TPostType}
     * @memberof Post
     */
    type: TPostType;
    /**
     * Contenu du post.
     *
     * @type {string}
     * @memberof Post
     */
    content: string;
    /**
     * Images associées au post.
     *
     * @type {string[]}
     * @memberof Post
     */
    images: string[];
    /**
     * Identifiant de la voie.
     *
     * @type {number}
     * @memberof Post
     */
    routeId?: number;
    /**
     * Nombre d'essais effectués.
     *
     * @type {number}
     * @memberof Post
     */
    tryCount?: number;
    /**
     * Nombre de likes du post.
     *
     * @type {number}
     * @memberof Post
     */
    likes: number;
    /**
     * Date de création du post.
     *
     * @type {Date}
     * @memberof Post
     */
    timestamp: Date;
}

/**
 * Voie ou bloc.
 *
 * @export
 * @interface Route
 */
export interface Route {
    /**
     * Identifiant unique de la voie.
     *
     * @type {number}
     * @memberof Route
     */
    id: number;
    /**
     * Nom de la voie.
     *
     * @type {string}
     * @memberof Route
     */
    name: string;
    /**
     * Type de la voie (voie ou bloc).
     *
     * @type {TRouteType}
     * @memberof Route
     */
    type: TRouteType;
    /**
     * Difficulté de la voie.
     *
     * @type {string}
     * @memberof Route
     */
    grade: string;
    /**
     * Localisation de la voie.
     *
     * @type {string}
     * @memberof Route
     */
    location: string;
    /**
     * Longueur de la voie (en mètres).
     *
     * @type {number}
     * @memberof Route
     */
    length: number;
}

/**
 * Utilisateur de l'application.
 *
 * @export
 * @interface User
 */
export interface User {
    /**
     * Identifiant unique de l'utilisateur.
     *
     * @type {number}
     * @memberof User
     */
    id: number;
    /**
     * Nom complet de l'utilisateur.
     *
     * @type {string}
     * @memberof User
     */
    name: string;
    /**
     * Pseudo de l'utilisateur.
     *
     * @type {string}
     * @memberof User
     */
    pseudo: string;
    /**
     * Description ou biographie de l'utilisateur.
     *
     * @type {string}
     * @memberof User
     */
    description: string;
    /**
     * URL de l'avatar de l'utilisateur.
     *
     * @type {string}
     * @memberof User
     */
    avatar: string;
}
