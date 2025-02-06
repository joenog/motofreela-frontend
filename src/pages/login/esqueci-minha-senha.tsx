import { FormEvent, useState } from 'react';
import './assets/styles/esqueci-minha-senha.css';
import Swal from 'sweetalert2';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export function EsqueciMinhaSenha() {
  const [email, setEmail] = useState<string>('');
  const [toogleStatus, setToogleStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, informe seu e-mail!',
      });
      return;
    }

    try {
      if (toogleStatus) {
        setIsLoading(true);
        await axios.post('user-business-reset-password/fourgout-password', {
          email,
        });
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'E-mail enviado com sucesso!',
        });
      } else {
        setIsLoading(true);
        await axios.post('user-motoboy-reset-password/fourgout-password', {
          email,
        });
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'E-mail enviado com sucesso!',
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
    <div className="esqueci-minha-senha">
      <Loading isLoading={isLoading} />
      <div className="container">
        <h1>Esqueci minha senha</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Informe seu e-mail:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="buttons-controls">
            <button type="submit" className="btn-black">
              Enviar
            </button>

            <button
              type="button"
              className="btn-white"
              onClick={() => (location.href = '/login')}
            >
              Voltar
            </button>
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
  );
}
