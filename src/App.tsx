import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold p-8">Employee Directory</h1>
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
