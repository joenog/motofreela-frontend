import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './src/components/Layout';
import { Home } from './src/pages/home';
import { Login } from './src/pages/login';
import { PrivateRoute } from './src/components/PrivateRoute';
import { EsqueciMinhaSenha } from './src/pages/login/esqueci-minha-senha';
import { RecuperarSenha } from './src/pages/login/recuperar-senha';
import { Register } from './src/pages/register';
import { NotFound } from './src/pages/notFound';
import { IndexMotoboy } from './src/pages/index (motoboy)';
import { IndexBusiness } from './src/pages/index(business)';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/esqueci-minha-senha',
    element: <EsqueciMinhaSenha />,
  },
  {
    path: '/login/recuperar-senha',
    element: <RecuperarSenha />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },

  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/index-motoboy', element: <IndexMotoboy /> },
          { path: '/index-business', element: <IndexBusiness />},
        ],
      },
    ],
  },
]);

export { router };
