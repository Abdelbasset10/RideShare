import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";


export default function RootLayout() {
  return (
      <div className="root-layout w-full">

        

        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
  );
}