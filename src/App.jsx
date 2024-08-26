import React from 'react';
import Layout  from './Components/Pages/Layout';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return ( 
    <>
    <NextUIProvider>

      <Layout/>
      <div className='text-center text-xs relative -top-4'>Powered by <span className='font-mono bounce font-bold text-teal-800'>AR</span></div>
    </NextUIProvider>
    </>
  );
}

export default App;
