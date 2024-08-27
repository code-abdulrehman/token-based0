import React, { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PageTitle from '../../../../Common/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from './../../../../../lib/redux/slices/authSlice/apis';
import { useNavigate } from 'react-router-dom';
// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});


// Initial form values
const initialValues = {
  email: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useDispatch(); // Use hook inside the component

  // Internal submit handler using dispatch
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      // Dispatch the login action
      await dispatch(loginUser(values));
      // Reset form on successful login
        navigate("/auth?logout")
        
        resetForm();
      } catch (error) {
        // Handle errors if login fails
        setErrors({ email: error.message, password: error.message });
      } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle title="Login" />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium text-center mb-16">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit} // Pass internal handler to Formik
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6 w-full">
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
              <div className="flex gap-2 justify-end">
                <Button type="submit" fullWidth color="primary" disabled={isSubmitting}>
                  {isSubmitting ? (<><Spinner size='md' color="default" /></>) : 'Login'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
