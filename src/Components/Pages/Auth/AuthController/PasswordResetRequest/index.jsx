import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, Spinner } from '@nextui-org/react';
import * as Yup from 'yup';

const resetRequestValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required')
});

export default function PasswordResetRequest({ onRequest }) {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={resetRequestValidationSchema}
      onSubmit={onRequest}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 w-full">
          <Field
            as={Input}
            name="email"
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
          <div className="flex gap-2 justify-end">
            <Button type="submit" fullWidth color="primary" disabled={isSubmitting}>
              {isSubmitting ? (<><Spinner size='md' color="default" /></>) : 'Request Reset Link'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
