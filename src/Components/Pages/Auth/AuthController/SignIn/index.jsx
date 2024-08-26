import React, { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PageTitle from '../../../../Common/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signInUser } from './../../../../../lib/redux/slices/authSlice/apis';
import { useNavigate } from 'react-router-dom';

// Updated validation schema using Yup
const validationSchema = Yup.object({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  phone_number_primary: Yup.string().required('Required'),
});

// Updated initial form values
const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number_primary: '',
};

const SignIn = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch(); // Use hook inside the component

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Internal submit handler using dispatch
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      // Dispatch the SignIn action
      await dispatch(signInUser(values));
      // Reset form on successful SignIn
      navigate("/auth?logout");
      resetForm();
    } catch (error) {
      // Handle errors if SignIn fails
      setErrors({ email: error.message, password: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle title="SignIn" />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium text-center">SignIn</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit} // Pass internal handler to Formik
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6 w-full overflow-y-auto h-[300px]">
              <div>
                <Field
                  as={Input}
                  name="first_name"
                  isRequired
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  as={Input}
                  name="last_name"
                  isRequired
                  label="Last Name"
                  placeholder="Enter your last name"
                />
                <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  as={Input}
                  name="email"
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  as={Input}
                  name="password"
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <FaEye className="text-xl text-gray-400" />
                      ) : (
                        <FaEyeSlash className="text-xl text-gray-400" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  as={Input}
                  name="phone_number_primary"
                  isRequired
                  label="Primary Phone Number"
                  placeholder="Enter your primary phone number"
                />
                <ErrorMessage name="phone_number_primary" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="submit" fullWidth color="primary" disabled={isSubmitting}>
                  {isSubmitting ? (<><Spinner size='md' color="default" /></>) : 'SignIn'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignIn;
