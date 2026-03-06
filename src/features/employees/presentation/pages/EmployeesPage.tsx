import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: employees, isLoading, isError, refetch } = useGetEmployeesQuery();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="bg-gray-100 px-6 py-3">
            <div className="flex gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              ))}
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-t border-gray-200 px-6 py-4">
              <div className="flex gap-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-sm text-red-600">
          Failed to load employees. Make sure the mock API is running.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className={`min-h-[44px] rounded-md px-4 py-2.5 text-sm font-medium shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            showCreateForm
              ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
          }`}
        >
          {showCreateForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            New Employee
          </h3>
          <EmployeeCreateForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      )}

      <EmployeesTable
        employees={employees ?? []}
        onRowClick={(employee) => navigate(`/employees/${employee.id}`)}
      />

      {employees && employees.length > 0 && (
        <p className="mt-3 text-sm text-gray-500">
          Showing {employees.length} employee{employees.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
