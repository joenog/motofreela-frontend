import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: {
        login: {
            error: string | null,
            isLoggedIn: IsLoggedIn
            loading: boolean
        }
    }) => state.login.isLoggedIn.isLoggedIn
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
