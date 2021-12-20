import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
};

const addPatient = (entry: NewPatientEntry) => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string) => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patients.find(p => p.id === id);
  patient?.entries.concat(newEntry);
  return newEntry;
};

const findPatient = (id: string): Patient | undefined => {
  const res = patients.find(p => p.id === id);
  return res;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findPatient,
  addEntry
};