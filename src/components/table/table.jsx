// vendors
import React from "react";
import {
  useBlockLayout,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import {
  FiChevronRight,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronsLeft,
} from "react-icons/fi";
import isEmpty from "ramda/src/isEmpty";

// components
import GlobalFilterInput from "./globalFilter";

// css
import "./table.css";

const Table = ({ columns, data, pagination }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFlexLayout,
    useGlobalFilter,
    usePagination
  );
  return (
    <div className='w-full'>
      <div className='w-full sm:w-64 py-4'>
        <GlobalFilterInput
          filter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="w-full overflow-x-auto overflow-y-hidden">
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="text-left border-r-0 py-4 pl-4" {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {!pagination &&
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          {pagination &&
            page?.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="py-2 pl-4 border-b" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="border-none" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          {pagination && isEmpty(page) && (
            <tr className='text-center text-sideBarText py-3'>
              <td colSpan={columns.length}>No data Found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div className='pagination'>
        <div className='flex flex-col gap-y-1'>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            className='px-1 py-0.5 rounded-md'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-row gap-x-1'>
          <div
            className='page'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FiChevronsLeft />
          </div>
          <div
            className='page'
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FiChevronLeft />
          </div>
          <div
            className='page'
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FiChevronRight />
          </div>
          <div
            className='page'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FiChevronsRight />
          </div>
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  pagination: false,
};

export default Table;
