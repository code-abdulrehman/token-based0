import React from 'react'
import PageTitle from '../../Common/PageTitle'

const NotFound = () => {
  return (
    <>

<PageTitle title="Not Found"/>
<div className="flex flex-col gap-8 items-center justify-center rounded-xl min-h-[88vh] overflow-auto bg-gray-100 p-4 ">
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
      <h1 className="text-[200px] font-medium">404</h1>

    </div>
    </>
  )
}

export default NotFound