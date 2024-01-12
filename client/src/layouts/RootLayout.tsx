import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { useAuth } from "../hooks/auth/useAuth";
import React from "react";
import Footer from "../components/Footer.tsx";

export default function RootLayout() {
  const { user } = useAuth();

  return (
    <div className="root-layout w-full">
      <Navbar />
      <main>
        <Outlet />

        <Footer />
      </main>
    </div>
  );
}
