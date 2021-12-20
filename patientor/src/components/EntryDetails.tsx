import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

type EntryProps = {
    entry: Entry;
};

type HealthCheckEntryProps = {
    entry: HealthCheckEntry;
};

type HospitalEntryProps = {
    entry: HospitalEntry;
};

type OccupationalHealthcareEntryProps = {
    entry: OccupationalHealthcareEntry;
};

const assertNever = (value: never): never => {
    throw new Error(`error ${JSON.stringify(value)}`);
};

const entryStyle = {
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 10,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginBottom: 10
};

const HospitalEntryDetails = ({ entry }: HospitalEntryProps ) => {
    const [{ diagnoses },] = useStateValue();
    
    return (
        <div className="hospital-entry" style={entryStyle} >
            <h3>{entry.date} <Icon name='hospital' size='large'/></h3>
            <div>{entry.description}</div>
            <div style={{ margin: 10 }}>
                {entry.diagnosisCodes?.length !== 0 ? 
                    entry.diagnosisCodes?.map(code => 
                        <li key={code}>
                            {code} {Object.values(diagnoses).find(d => d.code === code)?.name} 
                        </li>
                    )
                : null}                 
            </div>
            <div>
                Discharge: {entry.discharge.date} {entry.discharge.criteria}
            </div>
        </div>
    );
};

const OccupationalHealthcareEntryDetails = ({ entry }: OccupationalHealthcareEntryProps ) => {
    const [{ diagnoses },] = useStateValue();
    
    return (
        <div className="occupational-healthcare-entry" style={entryStyle} >
            <h3>{entry.date} <Icon name='suitcase' size='large' /></h3>
            <div>Employer: {entry.employerName}</div>
            <br></br>
            <div>{entry.description}</div>    
            <div style={{ margin: 10 }}>
                {entry.diagnosisCodes?.length !== 0 ? 
                    entry.diagnosisCodes?.map(code => 
                        <li key={code}>
                            {code} {Object.values(diagnoses).find(d => d.code === code)?.name} 
                        </li>
                    )
                : null}                 
            </div>
            <div>
                {entry.sickLeave ?
                    `Sickleave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`
                : null}
            </div>
        </div>
    );
};

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryProps ) => {
    const [{ diagnoses },] = useStateValue();
    
    const heartColor = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            default:
                return 'red';
        }
    };
    return (
        <div className="health-check-entry" style={entryStyle} >
            <h3>{entry.date} <Icon name='stethoscope' size='large' /></h3>
            <div>{entry.description}</div> 
            <div style={{ margin: 10 }}>
                {entry.diagnosisCodes?.length !== 0 ? 
                    entry.diagnosisCodes?.map(code => 
                        <li key={code}>
                            {code} {Object.values(diagnoses).find(d => d.code === code)?.name} 
                        </li>
                    )
                : null}                 
            </div>
            <div>
                <Icon name='heart' size='large' color={heartColor()} />
            </div>
        </div>
    );
};

const EntryDetails = ({ entry }: EntryProps ) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails ;

