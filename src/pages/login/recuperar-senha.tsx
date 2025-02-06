import { FormEvent, useState } from 'react';

import './assets/styles/recuperar-senha.css';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RecuperarSenha() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector(
    (state: any) => state.login.isLoggedin.isLoggedIn,
  );

  const token = searchParams.get('token');
  const userType = searchParams.get('userType');
  if (isLoggedIn) return <Navigate to="/" />;
  if (!token || !userType) return <Navigate to="/login" />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':",\\|,.<>/?]).{6,}$/;

    if (!password || !confirmPassword) {
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
        text: 'A senha precisa ter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial!',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não coincidem!',
      });
      return;
    }

    try {
      setIsLoading(true);
      if (userType === 'business') {
        await axios.post('user-business-reset-password/reset-password', {
          token,
          password,
        });
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Senha alterada com sucesso!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        });
      } else if (userType === 'motoboy') {
        await axios.post('user-motoboy-reset-password/reset-password', {
          token,
          password,
        });
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Senha alterada com sucesso!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.errors || 'Ocorreu um erro inesperado!',
      });
    }
  }

  return (
    <div className="recuperar-senha">
      <Loading isLoading={isLoading} />
      <div className="container">
        <h1>Alterar senha</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Informe sua nova senha:</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirme sua senha:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn-black">Alterar</button>
        </form>
      </div>
    </div>
  );
}
