import React from 'react';
import { Button, Spinner, Input, Textarea } from '@nextui-org/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TagCloud from '../../../../../../Common/TagCloud';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const BuyerSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  primary_phone_number: Yup.string().required('Phone number is required'),
  buyer_expiration_date: Yup.string().required('Buyer_expiration date is required'),
  buyer_need: Yup.object({
    budget_upto: Yup.string().required('Budget is required'),
    financial_status: Yup.string().oneOf(
      ['pre_qualified', 'pre_approved', 'all_cash', 'undetermined'],
      "Invalid financial status. Valid options are: 'pre_qualified', 'pre_approved', 'all_cash', 'undetermined'."
    ).required('Financial status is required'),
    min_area: Yup.string().required('Minimum area is required'),
    min_bathrooms: Yup.string().required('Minimum bathrooms is required'),
    min_bedrooms: Yup.string().required('Minimum bedrooms is required'),
    property_type: Yup.string().oneOf(
      ['single_family_house', 'townhouse', 'condo', 'apartment', 'multi_family_house', 'mobile'],
      'Invalid property type. Valid options are: single_family_house, townhouse, condo, apartment, multi_family_house, mobile.'
    ).required('Property type is required'),
    purchase_type: Yup.string().oneOf(
      ['purchase', 'lease'],
      'Invalid purchase type. Valid options are: purchase, lease.'
    ).required('Purchase type is required'),
    timeline: Yup.string().oneOf(
      ['asap', 'three_months', 'six_months', 'open'],
      'Invalid timeline. Valid options are: asap, three_months, six_months, open.'
    ).required('Timeline is required')
  }),
  additional_requests: Yup.array().of(Yup.string()),
  buyer_locations_of_interest: Yup.array().of(Yup.string()),
  is_favourite: Yup.boolean()
});
// Reusable InputField component
const InputField = ({ field, form, ...props }) => (
  <Input {...field} {...props} clearable bordered fullWidth />
);

// Reusable TextareaField component
const TextareaField = ({ field, form, ...props }) => (
  <Textarea {...field} {...props} clearable bordered fullWidth />
);
const CustomDatePicker = ({ field, form, ...props }) => {
  const { name } = field;
  const { setFieldValue } = form;

  return (
    <DatePicker
    isClearable
      selected={field.value ? new Date(field.value) : null}
      onChange={date => setFieldValue(name, date ? date.toISOString() : '')} 
      {...props}
    />
  );
};

const BuyerForm = ({ initialValues, onSubmit, isSubmitting, isUpdate }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BuyerSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="flex flex-col space-y-4 rounded-lg p-4 bg-white shadow-md">
       
       <div className="flex items-center gap-4 w-full flex-wrap md:flex-nowrap">
          {/* First Name */}
          <div className='w-full'>
            <label htmlFor="first_name" className="block text-sm text-gray-700 mb-1 pl-1 font-bold">First Name</label>
            <Field name="first_name" component={InputField} placeholder="First Name" color="default" />
            {errors.first_name && touched.first_name && (
              <div className="text-red-500 text-xs">{errors.first_name}</div>
            )}
          </div>

          {/* Last Name */}
          <div className='w-full'>
            <label htmlFor="last_name" className="block text-sm text-gray-700 mb-1 pl-1 font-bold">Last Name</label>
            <Field name="last_name" component={InputField} placeholder="Last Name" color="default" />
            {errors.last_name && touched.last_name && (
              <div className="text-red-500 text-xs">{errors.last_name}</div>
            )}
          </div>
          </div>

          <div className="flex items-center gap-4 w-full flex-wrap md:flex-nowrap">
          {/* Email */}
          <div className='w-full'>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1 pl-1 font-bold">Email</label>
            <Field name="email" component={InputField} placeholder="Email" color="default" type="email" />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div className='w-full'>
            <label htmlFor="primary_phone_number" className="block text-sm text-gray-700 mb-1 pl-1 font-bold">Primary Phone Number</label>
            <Field name="primary_phone_number" component={InputField} placeholder="Primary Phone Number" color="default" />
            {errors.primary_phone_number && touched.primary_phone_number && (
              <div className="text-red-500 text-xs">{errors.primary_phone_number}</div>
            )}
          </div>
          </div>


    <div className="w-full">
          <h4 className='font-bold'>Buyer Need</h4>
          <div className="pl-4 p-2 rounded-xl flex flex-wrap gap-4 items-center border border-gray-300 bg-white shadow-md">
            {Object.keys(initialValues.buyer_need).map((key) => (
              <div key={key} className='w-full md:w-[48%]'>
                <label htmlFor={`buyer_need.${key}`} className="block text-sm text-gray-700 mb-1 pl-1 font-bold">
                  {key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                </label>
                <Field name={`buyer_need.${key}`} component={InputField} placeholder={key.replace('_', ' ')} color="default"/>
                {errors.buyer_need?.[key] && touched.buyer_need?.[key] && (
                  <div className="text-red-500 text-xs">{errors.buyer_need[key]}</div>
                )}
              </div>
            ))}
          </div>
    </div>
    
    <div className="flex items-center gap-4 w-full flex-wrap md:flex-nowrap">

          {/* Additional Requests */}
          <div className='w-full'>
            <Field name="additional_requests">
              {({ field }) => (
                <TagCloud
                  label="Additional Requests"
                  placeholder="separated by commas or press Enter"
                  initialTags={values.additional_requests}
                  onTagsChange={(tags) => setFieldValue('additional_requests', tags)}
                  minTags={0}
                  tagType="text"
                  errorMessage="At least one additional request is required."
                />
              )}
            </Field>
          </div>

          {/* Buyer Locations of Interest */}
          <div className='w-full'>
            <Field name="buyer_locations_of_interest">
              {({ field }) => (
                <TagCloud
                  label="Buyer Locations of Interest"
                  placeholder="separated by commas or press Enter"
                   initialTags={values.buyer_locations_of_interest}
                  onTagsChange={(tags) => setFieldValue('buyer_locations_of_interest', tags)}
                  minTags={0}
                  tagType="text"
                  errorMessage="At least one location of interest is required."
                />
              )}
            </Field>
          </div>
    </div>


    <div className="flex items-center gap-4 w-full flex-wrap md:flex-nowrap">
       {/* buyer_expiration_date */}
    <div className='w-full'>
      <label htmlFor="buyer_expiration_date" className="block text-sm text-gray-700 mb-1 pl-1 font-bold">
        Buyer Expiration Date
      </label>
      <Field
        name="buyer_expiration_date"
        component={CustomDatePicker}
        placeholderText="Buyer Expiration Date"
        className="form-input mt-1 block w-full cursor-pointer bg-gray-100 p-2 rounded-xl focus:outline-none hover:bg-gray-200"
      />
       {errors.buyer_expiration_date && touched.buyer_expiration_date && (
              <div className="text-red-500 text-xs">{errors.buyer_expiration_date}</div>
            )}
    </div>
    </div>


          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              color="primary"
              className="flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner size="sm" color='default'/> : isUpdate ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BuyerForm;
