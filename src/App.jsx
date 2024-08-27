import React from 'react';
import Layout  from './Components/Pages/Layout';
import {NextUIProvider} from "@nextui-org/react";
import ErrorBoundary from './Components/Common/ErrorBoundary';
import CustomToast from './Components/Common/Toast';

function App() {
  return ( 
    <>
    <NextUIProvider>
<ErrorBoundary>

<CustomToast/>
      <Layout/>
      <div className='text-center text-xs'>Powered by <span className='font-mono bounce font-bold text-teal-800'>AR</span></div>
</ErrorBoundary>
    </NextUIProvider>
    </>
  );
}

export default App;
