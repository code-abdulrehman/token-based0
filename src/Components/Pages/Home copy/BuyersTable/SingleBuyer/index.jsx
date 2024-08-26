import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  Card, User } from '@nextui-org/react';
import { FaHeart } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

function SingleBuyer({ isOpen, onClose, user, setUser }) {
  useEffect(()=>{
    if(onClose){
      // setUser("") 
    }
  },[])
  const userInfo = user?.user || {};
  const {
    email = '- - - -',
    image_url = '/default-avatar.png', // Fallback if no image URL
    primary_phone_number = '- - - -'
  } = userInfo;

  const {
    first_name = '- - - -',
    last_name = '- - - -',
    additional_requests = [],
    buyer_expiration_date = '- - - -',
    buyer_locations_of_interest = [],
    buyer_need = {},
  } = user;
  console.log(user)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Buyer info</ModalHeader>
        <ModalBody className='w-full'>
        <div className="p-6 x-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* User Information Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between space-x-4">
            <User
              avatarProps={{ radius: 'sm',size:'lg', src: image_url }}
              description={<>{email}<br/>{primary_phone_number}</>}
              name={`${first_name} ${last_name}`}
              className="flex-shrink-0"
            />
           <div className="flex justify-start items-center">
            <Button className="bg-transparent flex justify-center w-4 items-center">
              <FaHeart className={user?.is_favourite ? "text-red-600" : "text-gray-400"} />
            </Button>
          </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Additional Requests</h3>
            <ul className="list-disc list-inside ml-4">
              {additional_requests.length ? (
                additional_requests.map((request, index) => (
                  <li key={index} className="text-gray-600">{request}</li>
                ))
              ) : (
                <li className="text-gray-600">No requests provided</li>
              )}
            </ul>
          </div>
        </div>

        {/* Broker Information Section */}
        <div className="flex-1">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Broker Details</h3>

          <div className="flex items-center justify-between space-x-4">
            <User
              avatarProps={{ radius: 'sm',size:'lg', src: user?.user?.image_url }}
              description={<>{user?.user?.email}<br/>{user?.user?.primary_phone_number}</>}
              name={`${user?.user?.first_name} ${user?.user?.last_name}`}
              className="flex-shrink-0"
            />
               <div className="flex justify-start items-center">
              <TiTick className={user?.user?.is_completed ? "text-green-600 text-2xl" : "text-gray-400 text-xl"} />
          </div>
          </div>

            <p className="text-gray-600"><strong>Broker City:</strong> {userInfo?.broker_city || '- - - -'}</p>
            <p className="text-gray-600"><strong>Broker Street Address:</strong> {userInfo?.broker_street_address || '- - - -'}</p>
            <p className="text-gray-600"><strong>Brokerage License No:</strong> {userInfo?.brokerage_lisence_no || '- - - -'}</p>
            <p className="text-gray-600"><strong>Brokerage Name:</strong> {userInfo?.brokerage_name || '- - - -'}</p>
            <p className="text-gray-600"><strong>Brokerage State:</strong> {userInfo?.brokerage_state || '- - - -'}</p>
            <p className="text-gray-600"><strong>Brokerage Zip Code:</strong> {userInfo?.brokerage_zip_code || '- - - -'}</p>
            <p className="text-gray-600"><strong>Broker Lisence_id:</strong> {user?.user?.lisence_id_no || '- - - -'}</p>
            
          </div>
        </div>
      </div>

      {/* Buyer Details Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Buyer Details</h3>
        <p className="text-gray-600"><strong>Expiration Date:</strong> {new Date(buyer_expiration_date).toLocaleDateString() || '- - - -'}</p>
        <p className="text-gray-600"><strong>Location of Interest:</strong> {buyer_locations_of_interest.length ? buyer_locations_of_interest.join(', ') : '- - - -'}</p>
        <p className="text-gray-600"><strong>Need:</strong> {buyer_need.budget_upto ? `$${buyer_need.budget_upto}` : 'Not specified'}</p>
        <p className="text-gray-600"><strong>Financial Status:</strong> {buyer_need?.financial_status || '- - - -'}</p>
        <p className="text-gray-600"><strong>Minimum Area:</strong> {buyer_need?.min_area || '- - - -'} sq ft</p>
        <p className="text-gray-600"><strong>Minimum Bathrooms:</strong> {buyer_need?.min_bathrooms || '- - - -'}</p>
        <p className="text-gray-600"><strong>Minimum Bedrooms:</strong> {buyer_need?.min_bedrooms || '- - - -'}</p>
        <p className="text-gray-600"><strong>Property Type:</strong> {buyer_need?.property_type || '- - - -'}</p>
        <p className="text-gray-600"><strong>Purchase Type:</strong> {buyer_need?.purchase_type || '- - - -'}</p>
        <p className="text-gray-600"><strong>Timeline:</strong> {buyer_need?.timeline || 'Not specified'}</p>
      </div>
    </div>
 
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onClose}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SingleBuyer;
