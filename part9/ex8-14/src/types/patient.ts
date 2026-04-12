import { z } from 'zod';
import { NewEntrySchema } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient =  z.infer<typeof NewEntrySchema>;