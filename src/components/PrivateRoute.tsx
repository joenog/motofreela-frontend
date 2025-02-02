import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: any) => {
    const isLoggedIn = state.login.isLoggedin.isLoggedIn;
    if (isLoggedIn) {
      return true;
    }
    return false;
  });

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
