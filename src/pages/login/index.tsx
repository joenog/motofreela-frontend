import { FormEvent, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../../styles/login.css';

import logoGoogle from '../../assets/images/google_img.png';
import * as actionsAuth from '../../store/modules/auth/actionsCreatores';
import Loading from '../../components/Loading';

export function Login() {
  const dispatch: Dispatch<any> = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        text: 'Please, fill all fields!',
      });
      return;
    }

    if (regex.test(password) === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect password!',
      });
      return;
    }

    try {
      dispatch(
        actionsAuth.loginRequest({
          loginRequest: {
            email,
            password,
          },
        }),
      );
    } catch (error: any) {
      if (error.response.status === 400) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.errors || 'Incorrect email or password!',
        });
      } else if (error.response.status === 500) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An unexpected error occurred',
        });
      }
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.erros || 'An unexpected error occurred',
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
              placeholder="Ex: youremail@address.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="passwor">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <div className="buttons-controls">
              <button type="submit" className="btn-black">
                Sign In
              </button>
              <button type="button" className="btn-white">
                <img src={logoGoogle} /> With Google
              </button>
              <a href="#">Forgout password</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
