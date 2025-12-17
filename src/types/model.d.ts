import type { TAvailability } from '@/enums/Availability';
import type { TClimbStyle } from '@/enums/ClimbStyle';
import type { TPostType } from '@/enums/PostType';
import type { TRouteType } from '@/enums/RouteType';
import type { TWeekDay } from '@/enums/WeekDay';

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
    id: number;
    /**
     * Identifiant de l'utilisateur.
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
     * Temps depuis la création du commentaire.
     *
     * @type {string}
     * @memberof Comment
     */
    date: string;
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
    /**
     * URL du logo de la salle.
     *
     * @type {string}
     * @memberof Gym
     */
    logo: string;
    /**
     * Numéro de téléphone de la salle.
     *
     * @type {string}
     * @memberof Gym
     */
    phone: string;
    /**
     * Site web de la salle.
     *
     * @type {(string | undefined)}
     * @memberof Gym
     */
    website?: string;
    /**
     * Horaires d'ouverture de la salle.
     *
     * @type {Record<TWeekDay, Timetable>}
     * @memberof Gym
     */
    openingHours: Record<TWeekDay, Timetable>;
    /**
     * Les types de voies disponibles dans la salle.
     *
     * @type {TRouteType[]}
     * @memberof Gym
     */
    routeTypes: TRouteType[];
    /**
     * Les styles d'escalade disponibles dans la salle.
     *
     * @type {TClimbStyle[]}
     * @memberof Gym
     */
    styles: TClimbStyle[];
    /**
     * Les images de la salle.
     *
     * @type {string[]}
     * @memberof Gym
     */
    images: string[]
}

/**
 * Note d'une salle d'escalade par un utilisateur.
 *
 * @interface GymGrade
 */
interface GymGrade {
    /**
     * Identifiant de la salle d'escalade.
     *
     * @type {number}
     * @memberof GymGrade
     */
    gymId: number;
    /**
     * Identifiant de l'utilisateur.
     *
     * @type {number}
     * @memberof GymGrade
     */
    userId: number;
    /**
     * Note attribuée à la salle d'escalade.
     *
     * @type {number}
     * @memberof GymGrade
     */
    grade: number;
    /**
     * Commentaire.
     *
     * @type {string}
     * @memberof GymGrade
     */
    comment?: string;
}

/**
 * Un message.
 *
 * @export
 * @interface Message
 */
export interface Message {
    /**
     * L'identifiant du message.
     *
     * @type {number}
     * @memberof Message
     */
    id: number;
    /**
     * L'identifiant de l'utilisateur
     *
     * @type {number}
     * @memberof Message
     */
    userId: number;
    /**
     * Le contenu du message.
     *
     * @type {string}
     * @memberof Message
     */
    text: string;
    /**
     * Temps depuis le message.
     *
     * @type {string}
     * @memberof Message
     */
    date: string;
    /**
     * Indique si le message a été lu.
     *
     * @type {boolean}
     * @memberof Message
     */
    read: boolean;
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
     * Temps depuis la création de la notification.
     *
     * @type {string}
     * @memberof Notification
     */
    date: string;
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
     * Image associée au post.
     *
     * @type {(string | undefined)}
     * @memberof Post
     */
    image?: string;
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
     * Temps passé création du post.
     *
     * @type {string}
     * @memberof Post
     */
    date: string;
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
    /**
     * Styles d'escalade de la voie.
     *
     * @type {TClimbStyle}
     * @memberof Route
     */
    styles: TClimbStyle[];
}

/**
 * Horaires d'ouverture et de fermeture.
 *
 * @export
 * @interface Timetable
 */
export interface Timetable {
    /**
     * Heure d'ouverture.
     *
     * @type {string}
     * @memberof Timetable
     */
    open: string;
    /**
     * Heure de fermeture.
     *
     * @type {string}
     * @memberof Timetable
     */
    close: string;
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
     * Âge de l'utilisateur.
     *
     * @type {number}
     * @memberof User
     */
    age: number;
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
    /**
     * Niveau d'escalade de l'utilisateur.
     *
     * @type {string}
     * @memberof User
     */
    level: string;
    /**
     * Les styles d'escalade préférés de l'utilisateur.
     *
     * @type {TRouteType[]}
     * @memberof User
     */
    styles: TRouteType[];
    /**
     * Identifiants des salles d'escalade fréquentées par l'utilisateur.
     *
     * @type {number[]}
     * @memberof User
     */
    gymsIds: number[];
    /**
     * Les disponibilités de l'utilisateur.
     *
     * @type {TAvailability[]}
     * @memberof User
     */
    availabilities: TAvailability[];
}
