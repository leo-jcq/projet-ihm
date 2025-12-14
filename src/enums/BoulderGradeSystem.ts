/**
 * Les types de cotation en bloc.
 *
 * @export
 * @enum {string}
 */
const BoulderGradeSystem = {
    Fontainebleau: 'fontainebleau',
    VGrade: 'v-grade'
} as const;

export default BoulderGradeSystem;

export const BoulderGradeSystemToString: Record<TBoulderGradeSystem, string> = {
    [BoulderGradeSystem.Fontainebleau]: 'FR (7A)',
    [BoulderGradeSystem.VGrade]: 'V-GRADE (V6)'
};

export type TBoulderGradeSystem = (typeof BoulderGradeSystem)[keyof typeof BoulderGradeSystem];
