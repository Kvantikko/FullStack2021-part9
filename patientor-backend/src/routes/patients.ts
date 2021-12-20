import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';
import { NewPatientEntry } from '../types';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.findPatient(id);
    return patient ? res.send(patient) : res.sendStatus(404);
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(newEntry, id);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body: NewPatientEntry = req.body;
        const newPatientEntry = toNewPatientEntry(body);
    
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;