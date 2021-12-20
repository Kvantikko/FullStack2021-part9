import React from 'react';
import { Modal, Segment, Button } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues }
  from './AddCheckEntryForm';
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues }
  from './AddOccupationalEntryForm';
import AddHospitalEntryForm, { HospitalEntryFormValues }
  from './AddHospitalEntryForm';

type EntryFormValues = 
  HealthCheckEntryFormValues | 
  OccupationalHealthcareEntryFormValues |
  HospitalEntryFormValues;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = React.useState('HealthCheck');

  const checkFormIsActive = () => {
    if (type === 'HealthCheck') return true;
    return false;
  };

  const occupationFormIsActive = () => {
    if (type === 'OccupationalHealthcare') return true;
    return false;
  };

  const hospitalFormIsActive = () => {
    if (type === 'Hospital') return true;
    return false;
  };

  const renderEntryForm = () => {
    switch (type) {
        case 'HealthCheck':
            return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
        case 'OccupationalHealthcare':
            return <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />;
        case 'Hospital':
            return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
        default:
            return 'red';
    }
  };
  
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry
        <div style={{textAlign: 'left'}}>
          <Button active={checkFormIsActive()} onClick={() =>
             setType('HealthCheck')} style={{margin: 10}}>Health Check Entry
          </Button>
          <Button active={occupationFormIsActive()}onClick={() =>
            setType('OccupationalHealthcare')} style={{margin: 10}}>Occupational Healthcare Entry
          </Button>
          <Button active={hospitalFormIsActive()} onClick={() =>
            setType('Hospital')} style={{margin: 10}}>Hospital Entry
          </Button>
        </div>
      </Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {renderEntryForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
