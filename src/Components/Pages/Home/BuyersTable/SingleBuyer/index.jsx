import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, User } from '@nextui-org/react';
import { FaInfoCircle } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import BuyerNote from './BuyerNote';
import FavoriteButton from './FavoriteButton';

function SingleBuyer({ isOpen, onClose, user, setUser }) {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    // Update localUser whenever the user prop changes
    setLocalUser(user);
  }, [user]);

  const handleUpdateUser = (updatedUserData) => {
    // Update localUser state and optionally call setUser if needed
    setLocalUser(updatedUserData);
    if (setUser) {
      setUser(updatedUserData);
    }
  };

  const userInfo = localUser?.user || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalContent>
        <ModalHeader className="flex items-center text-2xl gap-2 font-mono capitalize">
          <FaInfoCircle /> Buyer info
        </ModalHeader>
        <ModalBody className='w-full overflow-y-auto font-pop max-h-[80vh] h-auto'>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* User Information Section */}
              <div className="flex-1">
                <div className="flex items-center justify-between space-x-4">
                  <User
                    avatarProps={{ radius: 'sm', size: 'lg', src: localUser?.image_url }}
                    description={<>{localUser?.email}<br />{localUser?.primary_phone_number}</>}
                    name={`${localUser?.first_name} ${localUser?.last_name}`}
                    className="flex-shrink-0"
                  />
                  <FavoriteButton
                    user={localUser}
                    // disableAni={true}
                    // btnStyle={"flex justify-end p-0"}
                    onUpdate={handleUpdateUser}
                  />
                </div>

                <BuyerNote user={localUser} />

            
              </div>

              {/* Broker Information Section */}
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">Broker Details</h3>

                  <div className="flex items-center justify-between space-x-4">
                    <User
                      avatarProps={{ radius: 'sm', size: 'lg', src: userInfo?.image_url }}
                      description={<>{userInfo?.email}<br />{userInfo?.primary_phone_number}</>}
                      name={`${userInfo?.first_name} ${userInfo?.last_name}`}
                      className="flex-shrink-0"
                    />
                    <div className="flex justify-start items-center">
                      <TiTick className={userInfo?.is_completed ? "text-green-600 text-2xl" : "text-gray-400 text-xl"} />
                    </div>
                  </div>

                  <p className="text-gray-600"><strong>Broker City:</strong> {userInfo?.broker_city || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Broker Street Address:</strong> {userInfo?.broker_street_address || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Brokerage License No:</strong> {userInfo?.brokerage_lisence_no || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Brokerage Name:</strong> {userInfo?.brokerage_name || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Brokerage State:</strong> {userInfo?.brokerage_state || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Brokerage Zip Code:</strong> {userInfo?.brokerage_zip_code || '- - - -'}</p>
                  <p className="text-gray-600"><strong>Broker Lisence_id:</strong> {userInfo?.lisence_id_no || '- - - -'}</p>

                </div>
              </div>
            </div>

            {/* Buyer Details Section */}
            <div className="mt-6 float-left">
              <h3 className="text-xl font-semibold">Buyer Details</h3>
              <p className="text-gray-600"><strong>Expiration Date:</strong> {new Date(localUser?.buyer_expiration_date).toLocaleDateString() || '- - - -'}</p>
              <p className="text-gray-600"><strong>Need:</strong> {localUser?.buyer_need?.buyer_need?.budget_upto ? `${localUser?.buyer_need?.budget_upto}` : 'Not specified'}</p>
              <p className="text-gray-600"><strong>Financial Status:</strong> {localUser?.buyer_need?.financial_status || '- - - -'}</p>
              <p className="text-gray-600"><strong>Minimum Area:</strong> {localUser?.buyer_need?.min_area || '- - - -'} sq ft</p>
              <p className="text-gray-600"><strong>Minimum Bathrooms:</strong> {localUser?.buyer_need?.min_bathrooms || '- - - -'}</p>
              <p className="text-gray-600"><strong>Minimum Bedrooms:</strong> {localUser?.buyer_need?.min_bedrooms || '- - - -'}</p>
              <p className="text-gray-600"><strong>Property Type:</strong> {localUser?.buyer_need?.property_type || '- - - -'}</p>
              <p className="text-gray-600"><strong>Purchase Type:</strong> {localUser?.buyer_need?.purchase_type || '- - - -'}</p>
              <p className="text-gray-600"><strong>Timeline:</strong> {localUser?.buyer_need?.timeline || 'Not specified'}</p>
            </div> 

            <Button color="danger" variant="light" onClick={onClose} className='absolute bottom-20 right-8'>
              Close
            </Button>
          </div>
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

export default SingleBuyer;
