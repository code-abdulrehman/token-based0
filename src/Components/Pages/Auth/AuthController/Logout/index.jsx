import { Button } from '@nextui-org/react'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import PageTitle from '../../../../Common/PageTitle';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../../lib/redux/slices/authSlice/apis';
import { useDispatch } from 'react-redux';

const Logout = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
  const  logoutHandler = async () => {
    // sessionStorage.removeItem('authToken');
    await dispatch(logoutUser()).unwrap();
    navigate("/auth?login")
  }

  return (
    <>

<PageTitle title="Logout"/>
     <div className="flex flex-col justify-center items-center">

<h1 className="text-xl font-medium text-center">Logout</h1>
<FaSignOutAlt className="text-[11rem] mt-1"/>
      <Button fullWidth color="primary" className="mt-12" onClick={logoutHandler}>
      Logout
      </Button>
</div>
    </>
  )
}

export default Logout