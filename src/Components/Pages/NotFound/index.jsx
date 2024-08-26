import React from 'react'
import PageTitle from '../../Common/PageTitle'

const NotFound = () => {
  return (
    <>

<PageTitle title="Not Found"/>
        <div className="flex h-[90vh] justify-center items-center flex-col gap-0">
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
      <h1 className="text-[200px] font-medium">404</h1>

    </div>
    </>
  )
}

export default NotFound