import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-600">
        Failed to load employees. Make sure the mock API is running.
      </p>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {showCreateForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            New Employee
          </h2>
          <EmployeeCreateForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      )}

      <EmployeesTable
        employees={employees ?? []}
        onRowClick={(employee) => navigate(`/employees/${employee.id}`)}
      />
    </div>
  );
}
