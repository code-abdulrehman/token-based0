import React, { useState } from 'react';
import { User, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react';
import { FaPen, FaEye } from 'react-icons/fa';
import { BiDotsVertical } from 'react-icons/bi';
import FavoriteButton from '../SingleBuyer/FavoriteButton';
import SingleBuyer from '../SingleBuyer';
import CompleteButton from '../SingleBuyer/CompleteButton';
import BuyerCRModel from '../BuyerCRModer';

const TableCellContent = ({ user, columnKey }) => {
  const cellValue = user[columnKey];

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleView = () => {
    setViewUser(user);
    onViewOpen();
  };

  const handleEdit = () => {
    setEditUser(user.id);
    onEditOpen();
  };

  switch (columnKey) {
    case "buyer":
      return (
        <User
          avatarProps={{ radius: "lg", src: user?.image_url }}
          description={user?.email || " - - - -"}
          name={user?.first_name}
        />
      );

    case "note":
      return (
        <div className="flex justify-start items-center overflow-auto text-ellipsis line-clamp-2">
          {user?.note ? user.note : <span className="pl-6"> - - - - </span>}
        </div>
      );

    case "is_favourite":
      return (
        <div className="flex justify-start items-center">
          <FavoriteButton user={user} />
        </div>
      );

    case "email":
      return (
        <div className="flex justify-start items-center">
          {user?.email ? user.email : <span className="pl-6"> - - - - </span>}
        </div>
      );

    case "primary_phone_number":
      return (
        <div className="flex justify-start items-center">
          {user?.primary_phone_number ? user.primary_phone_number : <span className="pl-6"> - - - - </span>}
        </div>
      );

    case "sku":
      return (
        <div className="flex justify-start items-center">
          {user?.sku ? user.sku : <span className="pl-6"> - - - - </span>}
        </div>
      );

    case "is_completed":
      return (
        <div className="flex justify-start items-center">
          <CompleteButton user={user} />
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
              <DropdownItem onClick={handleView}>
                <div className="flex justify-start gap-2 items-center">
                  <FaEye /> View
                </div>
              </DropdownItem>
              <DropdownItem color="primary" onClick={handleEdit}>
                <div className="flex justify-start gap-2 items-center">
                  <FaPen /> Edit
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* View Modal */}
          <SingleBuyer isOpen={isViewOpen} onClose={onViewClose} user={viewUser} setUser={setViewUser} />

          {/* Edit Modal */}
          <BuyerCRModel isOpen={isEditOpen} onClose={onEditClose} userId={editUser} />
        </div>
      );

    default:
      return cellValue;
  }
};

export default TableCellContent;
