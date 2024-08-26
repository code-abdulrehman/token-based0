import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Spinner } from "@nextui-org/react";
import { columns } from './TableColumn';
import { useDispatch, useSelector } from "react-redux";
import { buyerFav, fetchBuyers } from "../../../../lib/redux/slices/buyersSlice/apis";
import { updateBuyer } from "../../../../lib/redux/slices/buyersSlice";
import TopContent from "./TopContent";
import BottomContent from "./BottomContent";
import TableCellContent from "./TableCellContent";

const INITIAL_VISIBLE_COLUMNS = ["id", "first_name", "phone_number_primary", "is_favourite", "actions"];

function BuyersTable() {

  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({ column: "name", direction: "ascending" });
  const [page, setPage] = useState(1);

  const users = useSelector((state) => state.buyers.data);
  const loading = useSelector((state) => state.buyers.loading);
  const error = useSelector((state) => state.buyers.error);

  useEffect(() => {
    dispatch(fetchBuyers());
  }, [dispatch]);


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

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={<BottomContent selectedKeys={selectedKeys} filteredItems={filteredItems} page={page} pages={pages} setPage={setPage} />}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "max-h-[382px]" }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={<TopContent filterValue={filterValue} onClear={onClear} onSearchChange={onSearchChange} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} users={users} onRowsPerPageChange={onRowsPerPageChange} />}
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
              ? (<><Spinner color="primary"/></>)
              : error
              ? error
              : "No users found"
          }
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <TableCellContent user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </>
  );
}

export default BuyersTable;
