import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Patient, NoSsn, NewPatient } from '../types/patient';

const getPatients = (): NoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};