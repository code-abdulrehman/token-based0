import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, Spinner } from '@nextui-org/react';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const passwordResetValidationSchema = Yup.object({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
});


export default function PasswordReset({ onReset }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
 
  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={passwordResetValidationSchema}
      onSubmit={onReset}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 w-full">
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
         
          <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
          <div className="flex gap-2 justify-end">
            <Button type="submit" fullWidth color="primary" disabled={isSubmitting}>
              {isSubmitting ? (<><Spinner size='md' color="default" /></>) : 'Reset Password'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
