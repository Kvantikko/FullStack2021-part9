import React from 'react';
import { Icon, Button} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { useStateValue, setPatientInfo, addEntry } from "../state";
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddCheckEntryForm";
import { OccupationalHealthcareEntryFormValues } from '../AddEntryModal/AddOccupationalEntryForm';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsInfo }, dispatch] = useStateValue();
  const patient = Object.values(patientsInfo).find(p => p.id == id);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if ( !Object.keys(patientsInfo).includes(id) ) {
      void fetchPatient();
    }
  }, [dispatch]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values:
    HealthCheckEntryFormValues | 
    OccupationalHealthcareEntryFormValues | 
    HospitalEntryFormValues
    ) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const renderGenderIcon = () => {
    if (patient?.gender === 'male') {
      return <Icon name='mars'/>;
    }
    if (patient?.gender === 'female') {
      return <Icon name='venus'/>;
    }
    return <Icon name='genderless'/>;
  };

  return(
    <div>
      <h2>{patient?.name} {renderGenderIcon()}</h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>Entries</h3>
      <div>
        {patient?.entries.length !== 0 ?   
          patient?.entries.map(e =>
            <EntryDetails key={e.id} entry={e} />
          )
        : 'no entries yet'}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()} style={{ marginTop: 10}}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
