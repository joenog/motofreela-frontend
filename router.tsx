import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './src/components/Layout';
import { Home } from './src/pages/home';
import { Login } from './src/pages/login';
import { PrivateRoute } from './src/components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [{ path: '/', element: <Home /> }],
      },
    ],
  },
]);

export { router };
