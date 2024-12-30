import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  // Kullanıcı kayıt olduysa yönlendir
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <label>
            Name
            <Field name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>
          <label>
            Email
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </label>
          <label>
            Password
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </label>
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
