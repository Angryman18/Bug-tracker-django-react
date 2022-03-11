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
    state: { pageIndex, pageSize },
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
      <table className='w-full' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='pagination'>
        <div className='flex flex-col gap-y-1'>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
          className="px-1 py-0.5 rounded-md"
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
        <div className="flex flex-row gap-x-1">
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