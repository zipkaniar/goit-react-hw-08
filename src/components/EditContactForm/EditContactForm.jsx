import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const EditContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .matches(/^\d+$/, 'Phone number must be numeric')
    .required('Phone number is required'),
});

const EditContactForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EditContactSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label>
            Name
            <Field name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>
          <label>
            Phone
            <Field name="phone" type="text" />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditContactForm;
