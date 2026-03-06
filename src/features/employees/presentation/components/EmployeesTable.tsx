import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Employee } from "../../domain/employee.types";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("department", {
    header: "Department",
    meta: { hideOnMobile: true },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const isActive = status === "active";
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
            aria-hidden="true"
          />
          {status}
        </span>
      );
    },
  }),
];

interface EmployeesTableProps {
  employees: Employee[];
  onRowClick?: (employee: Employee) => void;
}

export default function EmployeesTable({
  employees,
  onRowClick,
}: EmployeesTableProps) {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200">
      <table
        className="min-w-full divide-y divide-gray-200"
        aria-label="Employees"
      >
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className={`px-6 py-3 text-left text-sm font-semibold text-gray-700 ${
                    (header.column.columnDef.meta as { hideOnMobile?: boolean })
                      ?.hideOnMobile
                      ? "hidden sm:table-cell"
                      : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "button" : undefined}
                aria-label={
                  onRowClick
                    ? `View details for ${row.getValue("name")}`
                    : undefined
                }
                className={`${index % 2 === 1 ? "bg-gray-50/50" : ""} ${
                  onRowClick
                    ? "cursor-pointer hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    : ""
                }`}
                onClick={() => onRowClick?.(row.original)}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(row.original);
                        }
                      }
                    : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-6 py-4 text-sm text-gray-700 ${
                      (
                        cell.column.columnDef.meta as {
                          hideOnMobile?: boolean;
                        }
                      )?.hideOnMobile
                        ? "hidden sm:table-cell"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
