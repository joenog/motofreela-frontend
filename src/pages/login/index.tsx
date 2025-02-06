import { FormEvent, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './assets/styles/login.css';

import logoGoogle from '../../assets/images/google_img.png';
import * as actionsAuth from '../../store/modules/auth/actionsCreatores';
import Loading from '../../components/Loading';
import { FloatingMenu } from '../../components/floartingMenu';

export function Login() {
  const dispatch: Dispatch<any> = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [toogleStatus, setToogleStatus] = useState<boolean>(false);
  const isLoggedIn = useSelector(
    (state: any) => state.login.isLoggedin.isLoggedIn,
  );
  const isLoading = useSelector((state: any) => state.login.loading);

  if (isLoggedIn) return <Navigate to="/" />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':",\\|,.<>/?]).{6,}$/;

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos!',
      });
      return;
    }

    if (regex.test(password) === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Senha incorreta!',
      });
      return;
    }

    try {
      dispatch(
        actionsAuth.loginRequest({
          loginRequest: {
            email,
            password,
            business: toogleStatus,
          },
        }),
      );
    } catch (error: any) {
      if (error.response.status === 400) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.errors || 'E-mail ou senha incorretos!',
        });
      } else if (error.response.status === 500) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro inesperado!',
        });
      }
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.erros || 'Ocorreu um erro inesperado!',
      });
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Ex: seuemail@endereco.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <div className="buttons-controls">
              <button type="submit" className="btn-black">
                Entrar
              </button>
              <button type="button" className="btn-white">
                <img src={logoGoogle} /> Continuar com o Google
              </button>
              <a href="/login/esqueci-minha-senha">Esqueci minha senha</a>
            </div>
          </form>
        </div>

        <div className="toggle-container">
          <div
            className={`toggle ${toogleStatus ? 'on' : 'off'}`}
            id="toogle"
            onClick={() => setToogleStatus(!toogleStatus)}
          >
            <div className="button"></div>
          </div>

          <span className="toggle-text">
            {toogleStatus ? 'Empresa' : 'Entregador'}
          </span>
        </div>
      </div>
      <FloatingMenu />
    </>
  );
}
