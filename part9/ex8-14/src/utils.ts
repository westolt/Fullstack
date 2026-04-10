import { NewPatient } from './types/patient';
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.iso.date(),
  occupation: z.string(),
  gender: z.enum(['male', 'female', 'other']),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};