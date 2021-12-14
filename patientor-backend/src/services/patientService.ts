import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid'

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = (entry: NewPatientEntry) => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }

    patients.push(newPatientEntry);
    return newPatientEntry;

};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};