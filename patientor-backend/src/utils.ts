import { NewPatientEntry, Gender } from './types';
import { FinnishSSN } from 'finnish-ssn'

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };

    return newEntry;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date ' + dateOfBirth);
    }
    return dateOfBirth;
}

// https://github.com/vkomulai/finnish-ssn
const isSsn = (ssn: string): boolean => {
    if ( !FinnishSSN.validate(ssn) ) return false;
    
    return true;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error(
            'Incorrect or missing ssn ' + ssn + 
            '. Only real finnish ssns are valid. ' +
            'The code is using validator from https://github.com/vkomulai/finnish-ssn'
        );
    }
    
    return ssn;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender ||  !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    
    return gender;
}

export default toNewPatientEntry;