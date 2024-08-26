// import React from 'react';
// import { Button } from '@nextui-org/react';
// import { FaHeart } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { updateBuyer } from '../../../../../../lib/redux/slices/buyersSlice';
// import { buyerFav } from '../../../../../../lib/redux/slices/buyersSlice/apis';

// const FavoriteButton = ({ user, btnStyle, disableAni=false }) => {
//   const dispatch = useDispatch();

//   const handleBuyerFav = async (id, isFavourite) => {
//     const toggleFav = !isFavourite;
//     const data = { is_favourite: toggleFav };

//     try {
//       await dispatch(buyerFav({ id, data })).unwrap();
//       dispatch(updateBuyer({ id, data }));
//     } catch (error) {
//       console.error("Failed to update favorite status", error);
//     }
//   };

//   return (
//     <Button
//       className={`bg-transparent flex justify-center w-4 items-center ${btnStyle}`} disableAnimation={disableAni}
//       onClick={() => handleBuyerFav(user?.id, user?.is_favourite)}
//     >
//       <FaHeart className={user.is_favourite ? "text-red-600" : "text-gray-400"} />
//     </Button>
//   );
// };

// export default FavoriteButton;

import React from 'react';
import { Button } from '@nextui-org/react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateBuyer } from '../../../../../../lib/redux/slices/buyersSlice';
import { buyerFav } from '../../../../../../lib/redux/slices/buyersSlice/apis';

const FavoriteButton = ({ user, btnStyle, disableAni = false, onUpdate }) => {
  const dispatch = useDispatch();

  const handleBuyerFav = async (id, isFavourite) => {
    const toggleFav = !isFavourite;
    const data = { is_favourite: toggleFav };

    try {
      await dispatch(buyerFav({ id, data })).unwrap();
      dispatch(updateBuyer({ id, data }));

      // Call the onUpdate callback to propagate changes
      if (onUpdate) {
        onUpdate({ ...user, is_favourite: toggleFav });
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
    }
  };

  return (
    <Button
      className={`bg-transparent flex justify-center items-center ${btnStyle}`}
      isIconOnly 
      disableAnimation={disableAni}
      onClick={() => handleBuyerFav(user?.id, user?.is_favourite)}
    >
      <FaHeart className={user?.is_favourite ? "text-red-600" : "text-gray-400"} />
    </Button>
  );
};

export default FavoriteButton;
