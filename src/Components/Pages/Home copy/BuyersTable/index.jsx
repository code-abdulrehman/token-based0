import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { capitalize } from './../../../../lib/helper';
import { FaChevronDown, FaEye, FaHeart, FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { BiDotsVertical } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { columns } from './TableColumn';
import { useDispatch, useSelector } from "react-redux";
import { buyerFav, fetchBuyers } from "../../../../lib/redux/slices/buyersSlice/apis";
import { updateBuyer } from "../../../../lib/redux/slices/buyersSlice";
import SingleBuyer from "./SingleBuyer";

const INITIAL_VISIBLE_COLUMNS = ["id", "first_name", "phone_number_primary", "is_favourite", "actions"];

function BuyersTable() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [viewUser, setViewUser] = useState("")
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const users = useSelector((state) => state.buyers.data); // Update to match your actual state path
  const loading = useSelector((state) => state.buyers.loading);
  const error = useSelector((state) => state.buyers.error);

  useEffect(() => {
    dispatch(fetchBuyers());
  }, [dispatch]);

  

  const handleBuyerFav = (id, isFavourite) => {
    const toggleFav = !isFavourite;
    const data = { "is_favourite": toggleFav };
    
    dispatch(buyerFav({ id, data })).unwrap() 
    dispatch(updateBuyer({ id, data }))
      
  };


  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "first_name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.user.image_url }}
            description={user.user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );

      case "is_favourite":
        return (
          <div className="flex justify-start items-center">
            <Button className="bg-transparent flex justify-center w-4 items-center" onClick={() => handleBuyerFav(user.id, user.is_favourite)}>
              <FaHeart className={user.is_favourite ? "text-red-600" : "text-gray-400"} />
            </Button>
          </div>
        );
      case "email":
        return (
          <div className="flex justify-start items-center">
          {user.email? (user.email):<span className="pl-6"> ---- </span>}
          </div>
        );
      case "phone_number_primary":
        return (
          <div className="flex justify-start items-center">
          {user.user.phone_number_primary? (user.user.phone_number_primary):<span className="pl-6"> ---- </span>}
          </div>
        );
      case "lisence_id_no":
        return (
          <div className="flex justify-start items-center">
          {user.user.lisence_id_no? (user.user.lisence_id_no): <span className="pl-6"> ---- </span>}
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
                <DropdownItem onPress={onOpen} onClick={()=>setViewUser(user)}>
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
          </div>
        );

      default:
        return cellValue;
    }
  }, []);


  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

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
          <Button color="primary" endContent={<FaPlus />}>
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
    </div>
  ), [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      
    </div>
  ), [selectedKeys, filteredItems.length, page, pages]);

  return (
    <>
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "max-h-[382px]" }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
  emptyContent={
    loading
      ? "Loading..."
      : error
      ? error
      : "No users found"
  }
  items={sortedItems}
>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

<SingleBuyer isOpen={isOpen} onClose={onClose} user={viewUser} setUser={setViewUser}/>
    </>

  );
}

export default BuyersTable;