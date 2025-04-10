import BaseLayout from "./components/BaseLayout";

export default function HomePage() {
  return (
    <BaseLayout title="EuroPainters Dashboard">
      <h2 className="text-2xl font-semibold mb-4">Welcome to EuroPainters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-medium">Jobs</h3>
          <p>Manage all active jobs.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-medium">Employees</h3>
          <p>View and manage employees.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-medium">Customers</h3>
          <p>View and manage customer details.</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-medium">Payroll</h3>
          <p>Manage employee payroll and timesheets.</p>
        </div>
      </div>
    </BaseLayout>
  );
}
