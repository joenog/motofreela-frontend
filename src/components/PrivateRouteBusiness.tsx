import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../types/state';

export const PrivateRouteBusiness = () => {
  const isAuthenticated = useSelector((state: State) => {
    const user = state.login.isLoggedin.user;
    if (user?.business) {
      return true;
    }
    return false;
  });

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
