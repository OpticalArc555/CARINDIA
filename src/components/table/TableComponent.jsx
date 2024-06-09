/* eslint-disable react/prop-types */
// TableComponent.js
import {   Typography } from "@material-tailwind/react";


import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

const TableComponent = ({ columns, data }) => {
  
  console.log(data)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // setGlobalFilter,
    // state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  if (!data) return null; 
  // const { globalFilter, pageIndex } = state;

  return (
    <>
      {/* <div className="mt-5 mb-5 w-20">
        <Input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          
          label="Search"
        />
      </div> */}
      <div className="h-full w-full ">
        <table {...getTableProps()} className="w-full   table-auto text-center">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    {column.render("Header")}

                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              console.log(data.length-1 ==index)
             const isLast = data?.length-1 ===index
              const classes = isLast
                  ? "p-1"
                  : "p-3 border-b border-blue-gray-50";
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, i) => (
                    <td key={i} {...cell.getCellProps()} className={classes} >
                    <Typography
                        
                        color="blue-gray"
                        className="font-normal text-lg"
                      >   {cell.render("Cell")}</Typography> 
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-2">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous Page
        </Button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>{" "}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </Button>
      </div> */}
    </>
  );
};

export default TableComponent;
