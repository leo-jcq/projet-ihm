/**
 * Les jours de la semaine.
 *
 * @export
 * @enum {string}
 */
const WeekDay = {
    Monday: 'monday',
    Tuesday: 'tuesday',
    Wednesday: 'wednesday',
    Thursday: 'thursday',
    Friday: 'friday',
    Saturday: 'saturday',
    Sunday: 'sunday'
} as const;

export default WeekDay;

export const WeekDayToString: Record<TWeekDay, string> = {
    [WeekDay.Monday]: 'Lundi',
    [WeekDay.Tuesday]: 'Mardi',
    [WeekDay.Wednesday]: 'Mercredi',
    [WeekDay.Thursday]: 'Jeudi',
    [WeekDay.Friday]: 'Vendredi',
    [WeekDay.Saturday]: 'Samedi',
    [WeekDay.Sunday]: 'Dimanche'
};

export type TWeekDay = (typeof WeekDay)[keyof typeof WeekDay];
