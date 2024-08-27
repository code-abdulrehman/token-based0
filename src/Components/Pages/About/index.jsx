
import { Avatar, Card } from '@nextui-org/react'; // Ensure this import is correct
import { useState, useEffect } from 'react';
import PageTitle from '../../Common/PageTitle';

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      id: 1,
      email: 'admin@admin.com',
      updated_at: '2024-08-26T10:54:54Z',
      inserted_at: '2024-05-20T20:04:17Z',
      broker_city: 'New York',
      broker_street_address: '123, Hope Street',
      brokerage_lisence_no: 'LIS1234',
      brokerage_name: 'Broker Name',
      brokerage_state: 'CA',
      brokerage_zip_code: '12345',
      favourite_buyers: [9, 38, 34, 12, 79, 74, 87, 23, 8, 10, 4, 15, 22, 29, 27, 28, 7, 37, 32, 42, 49, 88, 45, 86, 13, 63, 61, 81, 78, 1],
      first_name: "User's first Name",
      last_name: "User's last Name",
      lisence_id_no: 'REVS12345',
      phone_number_primary: '+012345789',
      image_url: '/uploads/9C96BFEA-4192-4396-AC69-41234EE55236_1_201_a.png',
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center rounded-xl min-h-[88vh] overflow-auto bg-gray-100 p-4 flex-col">
      <Card className="w-full max-w-md shadow-lg">
        <Card className="flex flex-col p-4 overflow-y-auto">
    
          <Avatar
            isBordered
            radius="sm"
            src={data.image_url || "https://i.pravatar.cc/150?u=a04258a2462d826712d"}
            color="success"
            size="lg"
            className="float-right inline-flex absolute right-3"
          />
    
          <h2 className="text-xl font-bold mb-2 overflow-hidden text-ellipsis line-clamp-1 w-[60%]">{data.first_name} {data.last_name}</h2>
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {data.email}</p>
          <p className="text-gray-600 mb-1"><strong>Phone:</strong> {data.phone_number_primary}</p>
          <p className="text-gray-600 mb-1"><strong>Brokerage:</strong> {data.brokerage_name}</p>
          <p className="text-gray-600 mb-1"><strong>Address:</strong> {data.broker_street_address}, {data.broker_city}, {data.brokerage_state} {data.brokerage_zip_code}</p>
          <p className="text-gray-600 mb-1"><strong>License No:</strong> {data.brokerage_lisence_no}</p>
          <p className="text-gray-600"><strong>License ID No:</strong> {data.lisence_id_no}</p>
        </Card>
        <Card className="p-4 mt-2 text-center text-gray-500">
          <p><strong>Last Updated:</strong> {new Date(data.updated_at).toLocaleString()}</p>
        </Card>
      </Card>
    
      <PageTitle title="About"/>
    </div>
  );
}
