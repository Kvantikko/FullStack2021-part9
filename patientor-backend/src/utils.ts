import { NewPatientEntry, Gender, Entry, NewEntry, NewBaseEntry, HealthCheckRating } from './types';
import { FinnishSSN } from 'finnish-ssn'

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown }

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : PatientFields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

const isString = (text: unknown): text is string => {
    console.log('isString ', text);
    
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
        throw new Error('Incorrect or missing occupation ');
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    
    return gender;
}

const isArray = (param: any): param is Array<any> => {
    return Array.isArray(param);
};

const isEntries = (array: Array<any>): boolean => {
    if (array.length === 0) return true;
    
    for(let i = 0; i < array.length; i++) {
        if ( !(array[i].type === "HealthCheck" || 
            array[i].type === "OccupationalHealthcare" || 
            array[i].type === "Hospital")
            )   return false;
    };

    return true;    
};

const parseEntries = (entries: unknown): Array<Entry> | [] => {
    if (!entries) return []
    
    if (!isArray(entries) || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries ' + entries);
    }
    return entries;
}

export const toNewEntry = (object: any): NewEntry => {
    console.log('to new entry: ' , object);
    
    const type = object.type
    
    if (!type || !isType(type)) {
        throw new Error('Invalid type!');
    }

    const base: NewBaseEntry = {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description)
    }

    if (object.diagnosisCodes) {
        base.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
    }

    switch(type) {
        case 'HealthCheck':
            return {
                ...base,
                type: type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
        case 'OccupationalHealthcare':
            const obj: NewEntry = {
                ...base,
                type: type,
                employerName: parseName(object.employerName),
            }
            if (object.sickLeave.startDate || object.sickLeave.endDate) {
                obj.sickLeave = parseSickLeave(object.sickLeave)
            }
            return obj
        case 'Hospital':
            return {
                ...base,
                type: type,
                discharge: parseDischarge(object.discharge)
            }
        default:
            return assertNever(type);
    }
};

const isType = (type: any): type is 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
    return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(type)
}

const assertNever = (value: never): never => {
    throw new Error(`error ${JSON.stringify(value)}`);
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description ' + description);
    }
    return description
}

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist ' + specialist);
    }
    return specialist
}

const isStrings = (array: Array<unknown>): boolean => {
    for(let i = 0; i < array.length; i++) {
        if ( !isString(array[i]) ) return false
    };
    return true
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes || !isArray(diagnosisCodes) || !isStrings(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes ' + diagnosisCodes);
    }
    return diagnosisCodes
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if ( healthCheckRating === null || healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating) ) {
        throw new Error('Incorrect or missing healthCheckRating ' + healthCheckRating);
    }
    return healthCheckRating
}

const parseDischarge = (discharge: any): { date: string, criteria: string} => {
    if ( !discharge || !discharge.date || !discharge.criteria || 
         !isString(discharge.date) || !isDate(discharge.date)|| !isString(discharge.criteria) ) {
        throw new Error('Incorrect or missing discharge ' + discharge);
    }
    return discharge
}

const parseSickLeave = (sickleave: any): { startDate: string, endDate: string } => {
    if ( !sickleave || !sickleave.startDate || !sickleave.endDate || 
         !isString(sickleave.startDate) || !isDate(sickleave.startDate) || 
         !isString(sickleave.endDate) || !isDate(sickleave.endDate) ) {
        throw new Error('Incorrect or missing sickleave ' + sickleave);
    }
    return sickleave
}

export default { toNewPatientEntry, toNewEntry};