import React from 'react';
import PageTitle from './../../Common/PageTitle'
import BuyersTable from './BuyersTable'
const Home = () => {
  return (
    <>
    <PageTitle title="Home"/>
    <div className="flex flex-col gap-8 h-[90vh] justify-center items-center">
      <h1 className="text-4xl font-bold">Welcome to Home Page</h1>
      <div className="border p-1 w-full rounded-xl">

<BuyersTable/>
      </div>
    </div>
    </>
  );
};

export default Home;
