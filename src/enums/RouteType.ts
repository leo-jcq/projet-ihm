/**
 * Les types de voies (voie ou bloc).
 *
 * @export
 * @enum {string}
 */
const RouteType = {
    /**
     * Voie.
     */
    Route: 'route',
    /**
     * Bloc.
     */
    Boulder: 'boulder'
} as const;

export default RouteType;

export const RouteTypeToString: Record<TRouteType, string> = {
    route: 'Voie',
    boulder: 'Bloc'
};

export type TRouteType = (typeof RouteType)[keyof typeof RouteType];
