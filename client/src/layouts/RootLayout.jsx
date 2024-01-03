import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/auth/useAuth";

export default function RootLayout() {
  const { user } = useAuth();

  return (
    <div className="root-layout w-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
