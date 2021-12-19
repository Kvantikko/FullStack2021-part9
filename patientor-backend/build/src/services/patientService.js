"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (entry, id) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    const patient = patients.find(p => p.id === id);
    patient === null || patient === void 0 ? void 0 : patient.entries.concat(newEntry);
    return newEntry;
};
const findPatient = (id) => {
    const res = patients.find(p => p.id === id);
    return res;
};
exports.default = {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findPatient,
    addEntry
};
