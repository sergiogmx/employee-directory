import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-8">
            <h1 className="text-xl font-bold text-gray-900">
              Employee Directory
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
          <Routes>
            <Route path="/" element={<EmployeesPage />} />
            <Route
              path="/employees/:id"
              element={<EmployeeDetailDetailPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
