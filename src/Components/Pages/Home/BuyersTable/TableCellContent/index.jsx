import React, { useState } from 'react';
import { User, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react';
import { FaPen, FaEye } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { BiDotsVertical } from 'react-icons/bi';
import FavoriteButton from '../SingleBuyer/FavoriteButton';
import SingleBuyer from '../SingleBuyer';


const TableCellContent = ({ user, columnKey, }) => {
  const cellValue = user[columnKey];

    const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewUser, setViewUser] = useState("");
  switch (columnKey) {
    case "first_name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user?.user?.image_url }}
          description={user?.user?.email}
          name={cellValue}
        >
          {user?.email}
        </User>
      );

    case "is_favourite":
      return (
        <div className="flex justify-start items-center">
          <FavoriteButton user={user}/>
        </div>
      );

      case "email":
        return (
          <div className="flex justify-start items-center">
          {user?.email? (user?.email):<span className="pl-6"> - - - - </span>}
          </div>
        );
      case "phone_number_primary":
        return (
          <div className="flex justify-start items-center">
          {user?.user?.phone_number_primary? (user?.user?.phone_number_primary):<span className="pl-6"> - - - - </span>}
          </div>
        );
      case "lisence_id_no":
        return (
          <div className="flex justify-start items-center">
          {user?.user?.lisence_id_no? (user?.user?.lisence_id_no): <span className="pl-6"> - - - - </span>}
          </div>
        );

    case "is_completed":
      return (
        <div className="flex justify-start items-center">
          <Button className="bg-transparent flex justify-center w-4 items-center">
            <TiTick className={user?.user?.is_completed ? "text-green-600 text-2xl" : "text-gray-400 text-xl"} />
          </Button>
        </div>
      );

    case "actions":
      return (
        <div className="relative flex justify-center items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="md" variant="light">
                <BiDotsVertical className="text-black" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onPress={onOpen} onClick={() => setViewUser(user)}>
                <div className="flex justify-start gap-2 items-center">
                  <FaEye /> View
                </div>
              </DropdownItem>
              <DropdownItem color="primary">
                <div className="flex justify-start gap-2 items-center">
                  <FaPen /> Edit
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
                <SingleBuyer isOpen={isOpen} onClose={onClose} user={viewUser} setUser={setViewUser} />
        </div>
      );

    default:
      return cellValue;
  }
};

export default TableCellContent
