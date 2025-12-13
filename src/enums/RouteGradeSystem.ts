/**
 * Les types de cotation en voie.
 *
 * @export
 * @enum {string}
 */
const RouteGradeSystem = {
    French: 'french',
    UIAA: 'uiaa',
    USA: 'usa'
} as const;

export default RouteGradeSystem;

export const RouteGradeSystemToString: Record<TRouteGradeSystem, string> = {
    french: 'FR (7A)',
    uiaa: 'UIAA (VIII+)',
    usa: 'USA (5.11d)'
};

export type TRouteGradeSystem = (typeof RouteGradeSystem)[keyof typeof RouteGradeSystem];
