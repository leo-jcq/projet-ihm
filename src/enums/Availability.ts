import WeekDay, { WeekDayToString } from './WeekDay';

/**
 * Les disponibilités.
 *
 * @export
 * @enum {string}
 */
const Availability = {
    ...WeekDay,
    Flexible: 'flexible',
    WeekEnds: 'week-ends',
    WeekEvenings: 'week-evenings'
} as const;

export default Availability;

export const AvailabilityToString: Record<TAvailability, string> = {
    ...WeekDayToString,
    [Availability.Flexible]: 'Flexible',
    [Availability.WeekEnds]: 'Week-ends',
    [Availability.WeekEvenings]: 'Soirées en semaine'
};

export type TAvailability = (typeof Availability)[keyof typeof Availability];
