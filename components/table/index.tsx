/* eslint-disable react/jsx-key */
import { useTable, Column } from 'react-table';

interface TableProps {
  columns: Column[];
  data: any[];
  children: JSX.Element;
}

export const Table = ({ columns, data, children }: TableProps): JSX.Element => {
  // Use the useTable Hook to send the columns and data to build the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <div className="actions">{children}</div>
      <div className="table_container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .actions {
            @apply flex justify-end ml-2;
          }
          .actions :global(a) {
            @apply mr-2;
          }
          .table_container {
            @apply inline-block min-w-full shadow rounded-lg overflow-hidden m-3;
          }
          table {
            @apply min-w-full leading-normal;
          }
          thead tr {
            @apply px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider;
          }
          thead th {
            @apply px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider;
          }
          tbody {
            @apply bg-white;
          }
          tbody tr {
            @apply px-5 py-3 border-b-2;
          }
          tbody td {
            @apply px-5 py-3;
          }
        `}
      </style>
    </>
  );
};
