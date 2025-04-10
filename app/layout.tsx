import "./globals.css";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

export const metadata = {
  title: "Euro Painters Management System",
  description: "Manage jobs, employees, customers, and timesheets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

