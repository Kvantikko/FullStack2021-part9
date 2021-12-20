import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import dateValidator from "../helpers/dateValidator";

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id" >;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        diagnosisCodes: [],
        specialist: '',
        employerName: '',
        sickLeave: { startDate: '', endDate: '' } 
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const invalidDate = 'Date is invalid';
        const errors: { 
          description?: string;
          specialist?: string;
          date?: string;
          diagnosisCodes?: string;
          employerName?: string;
          sickLeave?: {
            startDate?: string;
            endDate?: string;
          }
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date) {
          const isValidDate = dateValidator(values.date);
          if(!isValidDate) {
            errors.date = invalidDate;
          }      
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate) {
          const isValidDate = dateValidator(values.sickLeave?.startDate);
          if(!isValidDate) {
            errors.sickLeave = {...errors.sickLeave};
            errors.sickLeave.startDate = invalidDate;
          }
          if(!values.sickLeave?.endDate) {
            errors.sickLeave = {...errors.sickLeave};
            errors.sickLeave.endDate = requiredError;
          }
        }
        if (values.sickLeave?.endDate) {
          const isValidDate = dateValidator(values.sickLeave?.endDate);
          if(!isValidDate) {
            errors.sickLeave = {...errors.sickLeave};
            errors.sickLeave.endDate = invalidDate;
          }
          if(!values.sickLeave?.startDate) {
            errors.sickLeave = {...errors.sickLeave};
            errors.sickLeave.startDate = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="healthcheckentry form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="DiagnosisSelection"
              placeholder="DiagnosisSelection"
              name="diagnosisSelection"
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={DiagnosisSelection}
            />
           <Field
              label="EmployerName"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid style={{ marginTop: 10 }}>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthcareEntryForm;
