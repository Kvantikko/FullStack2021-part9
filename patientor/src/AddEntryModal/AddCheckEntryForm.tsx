import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import dateValidator from "../helpers/dateValidator";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id" >;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

export const AddCheckEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        diagnosisCodes: [],
        specialist:'',
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const invalidDate = 'Date is invalid';
        const invalidRating = 'Rating must be between 0 and 3';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.date) {
          const isValid = dateValidator(values.date);
          if(!isValid) {
            errors.date = invalidDate;
          }      
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = invalidRating;
        }
        if ( !values.healthCheckRating ) {
          if( !(values.healthCheckRating === 0) )
          errors.healthCheckRating = invalidRating;
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
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default AddCheckEntryForm;
