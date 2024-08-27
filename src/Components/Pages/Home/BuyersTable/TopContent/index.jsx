import React, { useState, useMemo } from 'react';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react';
import { FaChevronDown, FaPlus, FaSearch } from 'react-icons/fa';
import { capitalize } from './../../../../../lib/helper';
import { columns } from '../TableColumn';
import BuyerCRModel from '../BuyerCRModer'; // Adjust the path as needed

const TopContent = ({
  filterValue,
  onClear,
  onSearchChange,
  visibleColumns,
  setVisibleColumns,
  users,
  onRowsPerPageChange,
}) => {
  const { isOpen: isAddNewOpen, onOpen: onAddNewOpen, onClose: onAddNewClose } = useDisclosure();

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" endContent={<FaPlus />} onClick={onAddNewOpen}>
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {users.length} buyers</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>

      {/* Add New Buyer Modal */}
      <BuyerCRModel isOpen={isAddNewOpen} onClose={onAddNewClose} />
    </div>
  ), [filterValue, visibleColumns, onRowsPerPageChange, users.length, onSearchChange, setVisibleColumns, isAddNewOpen, onAddNewClose]);

  return topContent;
};

export default TopContent;
