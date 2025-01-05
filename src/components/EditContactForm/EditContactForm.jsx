import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits") //  10 haneli zorunlu
    .required("Phone number is required"),
});

const EditContactForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: initialValues.name || "", //  Varsayılan boş string
        phone: initialValues.phone || "", //  Varsayılan boş string
      }}
      validationSchema={EditContactSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <label>
            Name
            <Field name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>

          <label>
            Phone
            <Field
              name="phone"
              type="text"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); //  Yalnızca rakam kabul et
                if (value.length <= 10) {
                  setFieldValue("phone", value); //  Formik state'ine güncelle
                }
              }}
            />
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
