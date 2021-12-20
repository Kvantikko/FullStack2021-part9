import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import dateValidator from "../helpers/dateValidator";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id" >;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses },] = useStateValue();
 
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        diagnosisCodes: [],
        specialist: '',
        discharge: { date: '', criteria: '' }
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
          discharge?: {
            date?: string;
            criteria?: string;
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
        if (!values.discharge.date) {
          errors.discharge = {...errors.discharge};
          errors.discharge.date = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = {...errors.discharge};
          errors.discharge.criteria = requiredError;
        }
        if (values.discharge.date) {
          const isValidDate = dateValidator(values.discharge.date);
          if(!isValidDate) {
            errors.discharge = {...errors.discharge};
            errors.discharge.date = invalidDate;
          }      
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="hospitalentry form ui">
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
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
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

export default AddHospitalEntryForm;
