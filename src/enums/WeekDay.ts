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
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
};

export type TWeekDay = (typeof WeekDay)[keyof typeof WeekDay];
