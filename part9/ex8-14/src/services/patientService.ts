import patients from '../data/patients';

import { NoSsn } from '../types/patient';

const getPatients = (): NoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};