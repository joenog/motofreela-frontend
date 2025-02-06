import { FormEvent, useState } from 'react';
import Loading from '../../components/Loading';
import { FloatingMenu } from '../../components/floartingMenu';
import Swal from 'sweetalert2';
//import styles from './style.module.css';

export function Register() {
  const [toogleStatus, setToogleStatus] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = useState<boolean>(false);

  interface UserRegister {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    cnpj?: string;
    cpf?: string;
  }

  const [userRegister, setUserRegister] = useState<UserRegister>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    cnpj: '',
    cpf: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':",\\|,.<>/?]).{6,}$/;

    if (!userRegister.email || !userRegister.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos!',
      });
      return;
    }

    if (regex.test(userRegister.password) === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A senha precisa ter no mínimo 6 caracteres, uma letra maiúscula e um símbolo!',
      });
      return;
    }
  }

  return (
    <>
      <Loading isLoading={false} />
      <div className="register">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Ex: seuemail@endereco.com"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Nome da sua empresa"
              value={userRegister.name}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            {toogleStatus ? (
              <>
                <label htmlFor="cpf">CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  placeholder="Digite seu CNPJ"
                  value={userRegister.cpf}
                  onChange={(e) =>
                    setUserRegister((prev) => ({
                      ...prev,
                      cnpj: e.target.value,
                    }))
                  }
                />
              </>
            ) : (
              <>
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={userRegister.cpf}
                  onChange={(e) =>
                    setUserRegister((prev) => ({
                      ...prev,
                      cpf: e.target.value,
                    }))
                  }
                />
              </>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Insira sua senha"
              value={userRegister.password}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

            <label htmlFor="password2">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Insira sua senha novamente"
              value={userRegister.password}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
            <button type="submit" className="btn-black">
              Cadastrar
            </button>
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
    </>
  );
}
