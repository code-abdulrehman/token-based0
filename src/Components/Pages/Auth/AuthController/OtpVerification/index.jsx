import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, Spinner } from '@nextui-org/react';
import * as Yup from 'yup';

const otpValidationSchema = Yup.object({
  otp: Yup.string().length(6, 'OTP must be 6 digits').required('Required')
});

export default function OtpVerification({ onVerify }) {
  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={otpValidationSchema}
      onSubmit={onVerify}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6 w-full">
          <Field
            as={Input}
            name="otp"
            isRequired
            label="OTP"
            placeholder="Enter the OTP sent to your email"
            type="text"
          />
          <ErrorMessage name="otp" component="div" className="text-red-500 text-xs mt-1" />
          <div className="flex gap-2 justify-end">
            <Button type="submit" fullWidth color="primary" disabled={isSubmitting}>
              {isSubmitting ? (<><Spinner size='md' color="default" /></>) : 'Verify OTP'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
