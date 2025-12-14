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
    [RouteGradeSystem.French]: 'FR (7A)',
    [RouteGradeSystem.UIAA]: 'UIAA (VIII+)',
    [RouteGradeSystem.USA]: 'USA (5.11d)'
};

export type TRouteGradeSystem = (typeof RouteGradeSystem)[keyof typeof RouteGradeSystem];
