/**
 * Table de conversion des cotations françaises vers les cotations UIAA.
 *
 * @export
 * @type {[string, string][]}
 */
export const FRENCH_TO_UIAA: [string, string][] = [
    ['1', 'I'],
    ['2', 'II'],
    ['3', 'III'],
    ['4', 'IV'],
    ['4+', 'IV/V'],
    ['5a', 'V'],
    ['5a/5b', 'VI'],
    ['5b', 'VI/VIIa'],
    ['5b/5c', 'VIIa'],
    ['5c', 'VIIb'],
    ['6a', 'VIIc'],
    ['6a+', 'VIIIa'],
    ['6b', 'VIIIb'],
    ['6b+', 'VIIIc'],
    ['6c', 'VIIIc/IXa'],
    ['6c+', 'IXa'],
    ['7a', 'IXb'],
    ['7a+', 'IXc'],
    ['7b', 'IXc/Xa'],
    ['7b+', 'Xa'],
    ['7c', 'Xb'],
    ['7c+', 'Xc'],
    ['8a', 'Xc'],
    ['8a+', 'Xc/XIa'],
    ['8b', 'XIb'],
    ['8b+', 'XIc'],
    ['8c', 'XIc/XIIa'],
    ['8c+', 'XIIa'],
    ['9a', 'XIIb'],
    ['9a+', 'XIIb/XIIc'],
    ['9b', 'XIIc'],
    ['9b+', '>XIIc'],
    ['9c', '>XIIc']
];

/**
 * Table de conversion des cotations françaises vers les cotations états-uniènes.
 *
 * @export
 * @type {[string, string][]}
 */
export const FRENCH_TO_USA: [string, string][] = [
    ['1', '5.2'],
    ['2', '5.3'],
    ['3', '5.4'],
    ['4a', '5.5'],
    ['4b', '5.6'],
    ['4c', '5.7'],
    ['5a', '5.8'],
    ['5b', '5.9'],
    ['5c', '5.10a'],
    ['6a', '5.10a'],
    ['6a+', '5.10b'],
    ['6b', '5.10c'],
    ['6b+', '5.10d'],
    ['6c', '5.11a'],
    ['6c+', '5.11b'],
    ['7a', '5.11d'],
    ['7a+', '5.12a'],
    ['7b', '5.12b'],
    ['7b+', '5.12c'],
    ['7c', '5.12d'],
    ['7c+', '5.13a'],
    ['8a', '5.13b'],
    ['8a+', '5.13c'],
    ['8b', '5.13d'],
    ['8b+', '5.14a'],
    ['8c', '5.14b'],
    ['8c+', '5.14c'],
    ['9a', '5.14d'],
    ['9a+', '5.15a'],
    ['9b', '5.15b'],
    ['9b+', '5.15c'],
    ['9c', '5.15d']
];

/**
 * Table de conversion des cotations Fotainebleau vers les cotations états-uniènes.
 *
 * @export
 * @type {[string, string][]}
 */
export const FONTAINEBLEAU_TO_VGRADE: [string, string][] = [
    ['1', 'VB'],
    ['2', 'VB'],
    ['3', 'VB'],
    ['4', 'V0'],
    ['4+', 'V0+'],
    ['5', 'V1'],
    ['5+', 'V2'],
    ['6a', 'V3'],
    ['6a+', 'V3'],
    ['6b', 'V4'],
    ['6b+', 'V4'],
    ['6c', 'V5'],
    ['6c+', 'V5'],
    ['7a', 'V6'],
    ['7a+', 'V7'],
    ['7b', 'V8'],
    ['7b+', 'V8'],
    ['7c', 'V9'],
    ['7c+', 'V10'],
    ['8a', 'V11'],
    ['8a+', 'V12'],
    ['8B', 'V13'],
    ['8b+', 'V14'],
    ['8c', 'V15'],
    ['8c+', 'V16'],
    ['9a', 'V17']
];
