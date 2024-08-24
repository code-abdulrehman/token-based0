import { Button } from '@nextui-org/react'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import PageTitle from '../../../../Common/PageTitle';

const Logout = () => {
  return (
    <>

<PageTitle title="Logout"/>
     <div className="flex flex-col justify-center items-center">

<h1 className="text-xl font-medium text-center">Logout</h1>
<FaSignOutAlt className="text-[11rem] mt-1"/>
      <Button fullWidth color="primary" className="mt-12">
      Logout
      </Button>
</div>
    </>
  )
}

export default Logout