import React from 'react';
import Layout  from './Components/Pages/Layout';


import {NextUIProvider} from "@nextui-org/react";
function App() {
  return ( 
    <>
    <NextUIProvider>

      <Layout/>
    </NextUIProvider>
    </>
  );
}

export default App;
