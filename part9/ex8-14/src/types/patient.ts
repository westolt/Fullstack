import { z } from 'zod';
import { NewEntrySchema } from '../utils';

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
}

export type NoSsn = Omit<Patient, 'ssn'>;

export type NewPatient =  z.infer<typeof NewEntrySchema>;