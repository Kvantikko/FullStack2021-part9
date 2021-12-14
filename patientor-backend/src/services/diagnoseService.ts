import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};
/*
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
      id,
      date,
      weather,
      visibility,
    }));
};
*/
const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  //getNonSensitiveEntries
};