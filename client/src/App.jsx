import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import SearchRoute from "./pages/SearchRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddRoute from "./pages/AddRoute";
import { CookiesProvider } from "react-cookie";
import { useAuth } from "./hooks/auth/useAuth";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";

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

const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <CookiesProvider>
      <AuthContext.Provider value={value}>
        {useMemo(
          () => (
            <RouterProvider router={router} />
          ),
          []
        )}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default App;
