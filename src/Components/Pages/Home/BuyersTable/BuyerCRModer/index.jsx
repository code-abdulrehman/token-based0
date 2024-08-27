
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from '@nextui-org/react';
import BuyerFormContainer from './BuyerFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBuyer } from '../../../../../lib/redux/slices/buyersSlice/apis';

function BuyerCRModel({ isOpen, onClose, userId }) {
  const dispatch = useDispatch();
  const { byId, loading, error } = useSelector((state) => ({
    byId: state.buyers.byId,
    loading: state.buyers.loading,
    error: state.buyers.error,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleBuyer(userId));
    }
  }, [userId, dispatch]);

  const buyerData = userId ? byId[userId] : null;

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalContent>
        <ModalHeader className="flex items-center text-2xl gap-2 font-mono capitalize">
          {userId ? "Update Buyer" : "Create Buyer"}
        </ModalHeader>
        <ModalBody className='w-full overflow-y-auto font-pop max-h-[80vh] h-auto'>
          {userId ? (
            buyerData ? (
              <BuyerFormContainer onClose={onClose} existingValues={buyerData} />
            ) : (
              <div className='w-full h-full'><Spinner color='primary' /></div>
            )
          ) : (
            <BuyerFormContainer />
          )}
        </ModalBody>
        <ModalFooter>
          <div className='flex justify-center items-end pt-4 gap-2 w-full text-xs relative -top-4'>
            Powered by <span className='font-mono bounce font-bold text-teal-800'>AR</span>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BuyerCRModel;
