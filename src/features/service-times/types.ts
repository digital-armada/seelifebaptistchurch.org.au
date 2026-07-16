export type DayOfWeek =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';

export interface ServiceTime {
    id: string;
    name: string;
    description: string | null;
    day: DayOfWeek;
    time: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateServiceTimeInput {
    name: string;
    description?: string;
    day: DayOfWeek;
    time: string;
}

export interface UpdateServiceTimeInput {
    name?: string;
    description?: string;
    day?: DayOfWeek;
    time?: string;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
};

export function dayLabel(day: DayOfWeek): string {
    return DAY_LABELS[day] ?? day;
}
