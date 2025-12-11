interface TabInfo {
    name: string;
    display: string;
}

export const SEARCH_TABS: TabInfo[] = [
    { name: 'all', display: 'Tout' },
    { name: 'posts', display: 'Posts' },
    { name: 'users', display: 'Personnes' },
    { name: 'routes', display: 'Voies' },
    { name: 'gyms', display: 'Salles' }
];

/**
 * 
 */
export const DEFAULT_TAB = SEARCH_TABS[0]!.name;
