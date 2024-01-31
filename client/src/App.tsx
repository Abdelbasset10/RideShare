import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Login from "./pages/Login";
import SearchRoute from "./pages/SearchRoute.tsx";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddRoute from "./pages/AddRoute";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { CookiesProvider } from "react-cookie";
import { useAuth } from "./hooks/auth/useAuth";
import { AuthContext } from "./contexts/AuthContext.tsx";
import { FC, useMemo, useState } from "react";
import React from "react";
import { User, UserTypes } from "./utils/type-interfaces.ts";
import AdminProfile from "./pages/AdminProfile.tsx";

const App: FC = () => {
  const [user, setUser] = useState<User | any>(null);

  return (
    <CookiesProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <RouterProvider
          router={createBrowserRouter(
            createRoutesFromElements(
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />

                <Route
                  path="login"
                  element={
                    <ProtectedRoute redirectPath="/" isAllowed={user === null}>
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute redirectPath="/" isAllowed={user != null}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="admin"
                  element={
                    <ProtectedRoute redirectPath="/" isAllowed={(user != null) /*&& (user.type === UserTypes.ADMIN) */}>
                      <AdminProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="register"
                  element={
                    <ProtectedRoute redirectPath="/" isAllowed={user === null}>
                      <Register />
                    </ProtectedRoute>
                  }
                />

                <Route path="routes/search" element={<SearchRoute />} />
                <Route path="routes/add" element={<AddRoute />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            )
          )}
        />
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default App;
