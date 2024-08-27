import React, { useState } from 'react';
import BuyerForm from './BuyerForm/index';
import { useDispatch } from 'react-redux';
import { buyerUpdate, createBuyer } from '../../../../../../lib/redux/slices/buyersSlice/apis';
import { updateBuyer } from '../../../../../../lib/redux/slices/buyersSlice';

const BuyerFormContainer = ({ existingValues, onClose }) => {
  const dispatch = useDispatch();
  const userId = existingValues?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    console.log('Form Values:', values);

    try {
      if (userId) {
        await dispatch(buyerUpdate({ id: userId, data: values }));
        await dispatch(updateBuyer({ id: userId, data: values }));
      } else {
        await dispatch(createBuyer(values));
        await dispatch(updateBuyer(values));
      }
      console.log('Form Submitted Successfully');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
      if (onClose) onClose();
    }
  };

  const initialValues = {
    first_name: existingValues?.first_name || '',
    last_name: existingValues?.last_name || '',
    email: existingValues?.email || '',
    primary_phone_number: existingValues?.primary_phone_number || '',
    buyer_need: {
      budget_upto: existingValues?.buyer_need?.budget_upto || '',
      financial_status: existingValues?.buyer_need?.financial_status || '',
      min_area: existingValues?.buyer_need?.min_area || '',
      min_bathrooms: existingValues?.buyer_need?.min_bathrooms || '',
      min_bedrooms: existingValues?.buyer_need?.min_bedrooms || '',
      property_type: existingValues?.buyer_need?.property_type || '',
      purchase_type: existingValues?.buyer_need?.purchase_type || '',
      timeline: existingValues?.buyer_need?.timeline || ''
    },
    buyer_expiration_date: existingValues?.buyer_expiration_date || '',
    additional_requests: existingValues?.additional_requests || [],
    buyer_locations_of_interest: existingValues?.buyer_locations_of_interest || [],
    is_favourite: existingValues?.is_favourite || false
  };

  return (
    <BuyerForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isUpdate={!!userId}
    />
  );
};

export default BuyerFormContainer;
