import React from 'react'
import { FaUserClock } from 'react-icons/fa'
import CountdownTimer from '../../../../Common/CountdownTimer'
import PageTitle from '../../../../Common/PageTitle';
const TokenControl = () => {
  return (
    <>

<PageTitle title="Token Expire"/>
     <div className="flex flex-col justify-center items-center">

<h1 className="text-xl font-medium ">Token </h1>
<FaUserClock  className="text-[8rem]"/>
<div className="flex flex-col gap-4 mt-12">
    Token Expire in:
  <CountdownTimer />
</div>
</div>
</>
  )
}

export default TokenControl