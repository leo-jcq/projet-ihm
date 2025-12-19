/**
 * Les types d'escalade.
 *
 * @export
 * @enum {string}
 */
const ClimbStyle = {
    Physical: 'physical',
    Slab: 'slab',
    Finger: 'finger',
    Crimpy: 'crimpy',
    Overhang: 'overhang',
    Technical: 'technical',
    Dynamic: 'dynamic'
} as const;

export default ClimbStyle;

export const ClimbStyleToString: Record<TClimbStyle, string> = {
    [ClimbStyle.Physical]: 'Physique',
    [ClimbStyle.Slab]: 'Dalle',
    [ClimbStyle.Finger]: 'À doigts',
    [ClimbStyle.Crimpy]: 'Reglette',
    [ClimbStyle.Overhang]: 'Dévers',
    [ClimbStyle.Technical]: 'Technique',
    [ClimbStyle.Dynamic]: 'Dynamique'
};

export type TClimbStyle = (typeof ClimbStyle)[keyof typeof ClimbStyle];
