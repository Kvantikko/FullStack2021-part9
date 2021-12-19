"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const finnish_ssn_1 = require("finnish-ssn");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    console.log('isString ', text);
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const isDate = (date) => {
    console.log('datetest ', Boolean(Date.parse(date)));
    return Boolean(Date.parse(date));
};
const parseDate = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date ' + dateOfBirth);
    }
    return dateOfBirth;
};
// https://github.com/vkomulai/finnish-ssn
const isSsn = (ssn) => {
    if (!finnish_ssn_1.FinnishSSN.validate(ssn))
        return false;
    return true;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn ' + ssn +
            '. Only real finnish ssns are valid. ' +
            'The code is using validator from https://github.com/vkomulai/finnish-ssn');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};
const isArray = (param) => {
    return Array.isArray(param);
};
const isEntries = (array) => {
    if (array.length === 0)
        return true;
    for (let i = 0; i < array.length; i++) {
        if (!(array[i].type === "HealthCheck" ||
            array[i].type === "OccupationalHealthcare" ||
            array[i].type === "Hospital"))
            return false;
    }
    ;
    return true;
};
const parseEntries = (entries) => {
    if (!entries)
        return [];
    if (!isArray(entries) || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries ' + entries);
    }
    return entries;
};
const toNewEntry = (object) => {
    console.log('to new entry: ', object);
    const type = object.type;
    if (!type || !isType(type)) {
        throw new Error('Invalid type!');
    }
    const base = {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description)
    };
    if (object.diagnosisCodes) {
        base.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    switch (type) {
        case 'HealthCheck':
            return Object.assign(Object.assign({}, base), { type: type, healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case 'OccupationalHealthcare':
            const obj = Object.assign(Object.assign({}, base), { type: type, employerName: parseName(object.employerName) });
            if (object.sickLeave.startDate || object.sickLeave.endDate) {
                obj.sickLeave = parseSickLeave(object.sickLeave);
            }
            return obj;
        case 'Hospital':
            return Object.assign(Object.assign({}, base), { type: type, discharge: parseDischarge(object.discharge) });
        default:
            return assertNever(type);
    }
};
exports.toNewEntry = toNewEntry;
const isType = (type) => {
    return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(type);
};
const assertNever = (value) => {
    throw new Error(`error ${JSON.stringify(value)}`);
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist ' + specialist);
    }
    return specialist;
};
const isStrings = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (!isString(array[i]))
            return false;
    }
    ;
    return true;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isArray(diagnosisCodes) || !isStrings(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (healthCheckRating === null || healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDischarge = (discharge) => {
    if (!discharge || !discharge.date || !discharge.criteria ||
        !isString(discharge.date) || !isDate(discharge.date) || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge ' + discharge);
    }
    return discharge;
};
const parseSickLeave = (sickleave) => {
    if (!sickleave || !sickleave.startDate || !sickleave.endDate ||
        !isString(sickleave.startDate) || !isDate(sickleave.startDate) ||
        !isString(sickleave.endDate) || !isDate(sickleave.endDate)) {
        throw new Error('Incorrect or missing sickleave ' + sickleave);
    }
    return sickleave;
};
exports.default = { toNewPatientEntry: exports.toNewPatientEntry, toNewEntry: exports.toNewEntry };
