import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './src/components/Layout';
import { Home } from './src/pages/home';
import { Login } from './src/pages/login';
import { PrivateRoute } from './src/components/PrivateRoute';
import { EsqueciMinhaSenha } from './src/pages/login/esqueci-minha-senha';
import { RecuperarSenha } from './src/pages/login/recuperar-senha';
import { Register } from './src/pages/register';

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
