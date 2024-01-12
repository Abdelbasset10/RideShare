import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Login from "./pages/Login";
import SearchRoute from "./pages/SearchRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddRoute from "./pages/AddRoute";
import { CookiesProvider } from "react-cookie";
import { useAuth } from "./hooks/auth/useAuth";
import { AuthContext } from "./contexts/AuthContext.tsx";
import { FC, useMemo, useState } from "react";
import React from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="routes/search" element={<SearchRoute />} />
      <Route path="routes/add" element={<AddRoute />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App: FC = () => {
  const [user, setUser] = useState(null);

  return (
    <CookiesProvider>
      <AuthContext.Provider value={{ user: user, setUser: setUser }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default App;
