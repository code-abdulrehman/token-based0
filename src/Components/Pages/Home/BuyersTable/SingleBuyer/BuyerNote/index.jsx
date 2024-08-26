import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Textarea } from '@nextui-org/react';
import { FaPen } from 'react-icons/fa';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { buyerNote } from '../../../../../../lib/redux/slices/buyersSlice/apis';
import { updateBuyer } from '../../../../../../lib/redux/slices/buyersSlice';

// Validation schema for Formik
const NoteSchema = Yup.object().shape({
  note: Yup.string().max(200, 'Note is too long').required('Note is required'),
});


const BuyerNote = ({ user }) => {
  const userId = user.id;
  const note = user?.note || '';
  // console.log(user, userId)
  
  const [isNoteEdit, setIsNoteEdit] = React.useState(false);
  const dispatch = useDispatch();

  // Handle form submission
  const handleNoteSubmit = (values, { setSubmitting }) => {
    if (userId) {
      console.log("Submitting note for user ID:", userId); // Add this line for debugging
      dispatch(buyerNote({ id: userId, data: values.note }));
    } else {
      console.error("User ID is undefined");
    }
    setIsNoteEdit(false);
    setSubmitting(false);
  };
  

  return (
    <div className="mt-6">
      <h3 className={`flex justify-between items-center py-2 ${isNoteEdit ? "flex-col" : ""}`}>
        <span className='text-xl font-semibold flex w-full justify-start'>Buyer Note:</span>
        {isNoteEdit ? (
          <Formik
            initialValues={{ note: note || '' }}
            validationSchema={NoteSchema}
            onSubmit={handleNoteSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='w-full'>
                <Field name="note">
                  {({ field }) => (
                    <Textarea
                      {...field}
                      label="Note"
                      placeholder="Enter buyer note .. "
                      maxLength={200}
                      rows={4}
                      className='w-full'
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  color="primary"
                  className='float-right mt-2'
                  disabled={isSubmitting}
                >
                  {note ? "Update Note" : "Save Note"}
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <span
            className="border h-6 w-6 rounded-md border-black flex justify-center items-center text-sm cursor-pointer hover:text-white hover:bg-blue-500 overflow-hidden hover:border-white"
            onClick={() => setIsNoteEdit(true)}
          >
            <FaPen />
          </span>
        )}
      </h3>
      {!isNoteEdit && (
        <div className="text-gray-600 line-clamp-3 text-ellipsis overflow-hidden">{note || " - - - - "}</div>
      )}
    </div>
  );
};

export default BuyerNote;
