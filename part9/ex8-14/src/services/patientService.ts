import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Patient, NewPatient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getOnePatient,
  addPatient
};