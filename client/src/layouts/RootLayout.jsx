import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function RootLayout() {
  return (
    <div className="root-layout w-9/12 m-auto flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}