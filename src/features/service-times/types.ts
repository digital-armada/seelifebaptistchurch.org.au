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
export interface UpdateServiceTimeInput {
    name?: string;
    description?: string;
    time?: string;
}
