import React from 'react';
import { TiTick } from 'react-icons/ti';
import { Button } from '@nextui-org/react';

const CompleteButton = ({user, btnStyle, disableAni=false}) => {


  return (
    <Button
      className={`bg-transparent flex justify-center items-center ${btnStyle}`}
      isIconOnly
      disableAnimation={disableAni}
    >
      <TiTick className={user?.user?.is_completed ? "text-green-600 text-2xl" : "text-gray-400 text-xl"} />
    </Button>
  );
};

export default CompleteButton;
