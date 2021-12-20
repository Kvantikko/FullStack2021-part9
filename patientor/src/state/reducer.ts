import { State } from "./state";
import { Diagnosis, Patient, Entry} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT_INFO";
    payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry, id: string };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_INFO": 
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (diagnoses, diagnosis) => ({ ...diagnoses, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: {
            ...state.patientsInfo[action.payload.id], 
            entries: state.patientsInfo[action.payload.id].entries.concat(action.payload.entry)
          }
        }
      } ;
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatientInfo = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_INFO",
    payload: patient
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, id }
  };
};
