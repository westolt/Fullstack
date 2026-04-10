import { NewPatient,Gender } from './types/patient';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!isString(name)) {
        throw new Error('Incorrect name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation');
    }
    return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender:unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object)  {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;