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
import {  AuthContextProvider} from "./contexts/AuthContext";
import { useAuth } from "./hooks/auth/useAuth";

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
  const { user,setUser } = useAuth();
  
  return (
    <CookiesProvider>
      <AuthContextProvider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </CookiesProvider>
  );
};

export default App;