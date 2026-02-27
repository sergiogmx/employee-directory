import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetEmployeeDetailByIdQuery, useUpdateEmployeeDetailMutation } from "../../data/employee-detailApi";
import { useGetDepartmentsQuery } from "../../../employees/data/employeesApi";
import EmployeeDetailForm from "../components/EmployeeDetailForm";

export default function EmployeeDetailDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = Number(id);

  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeDetailByIdQuery(employeeId);
  const { data: departments } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employee...</p>;
  }

  if (isError || !employee) {
    return (
      <p className="p-8 text-red-600">
        Failed to load employee. Make sure the mock API is running.
      </p>
    );
  }

  const departmentNames = departments?.map((d) => d.name) ?? [];

  const handleSubmit = async (data: Omit<typeof employee, "id">) => {
    const result = await updateEmployee({ id: employee.id, ...data });
    if (!("error" in result)) {
      navigate("/");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      <Link
        to="/"
        className="mb-4 inline-block text-sm text-blue-600 hover:text-blue-800"
      >
        &larr; Back to list
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Edit Employee — {employee.firstName} {employee.lastName}
      </h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          defaultValues={employee}
          departments={departmentNames}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}
