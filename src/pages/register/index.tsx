import { FormEvent, useState } from 'react';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import axios from '../../services/axios';

export function Register() {
  const [toogleStatus, setToogleStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface UserRegister {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    cnpj?: string;
    cpf?: string;
    city: string;
    neighborhood: string;
    street: string;
    numberHome: string;
    zipCode: string;
  }

  const [userRegister, setUserRegister] = useState<UserRegister>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    cnpj: '',
    cpf: '',
    city: '',
    neighborhood: '',
    street: '',
    numberHome: '',
    zipCode: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':",\\|,.<>/?]).{6,}$/;

    if (
      !userRegister.email ||
      !userRegister.name ||
      !userRegister.city ||
      !userRegister.neighborhood ||
      !userRegister.street ||
      !userRegister.numberHome ||
      !userRegister.zipCode
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos!',
      });
      return;
    }
    // VERIFICAR COM CNPJ MODO EMPRESA ATIVO
    if (toogleStatus && !userRegister.cnpj) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor, preencha o campo CNPJ',
      });
      return;
    }

    if (toogleStatus && !validarCNPJ(userRegister.cnpj as string)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O CNPJ não existe!',
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

    //CONFIRM PASSWORD
    if (userRegister.confirmPassword !== userRegister.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'As duas senhas precisam ser identicas...',
      });
      return;
    }

    try {
      setIsLoading(true);
      if (toogleStatus) {
        await axios.post('user-business', userRegister);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Sua conta foi criada com sucesso!',
        }).then((result) => {
          if (result.isConfirmed) {
            document.location = '/login?userType=business';
            setIsLoading(false);
          }
        });
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.status === 400) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.errors || '',
        });
      } else if (error.response.status === 500) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'O correu um erro inesperado!',
        });
      }
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O correu um erro inesperado!',
      });
    }
  }

  function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseFloat(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseFloat(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  }

  return (
    <>
      <Loading isLoading={isLoading} />
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
              placeholder={toogleStatus ? 'Nome da sua empresa' : 'Seu nome'}
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
                  value={userRegister.cnpj}
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
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              name="city"
              placeholder="Ex: São Paulo"
              value={userRegister.city}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
            <label htmlFor="neighborhood">Bairro</label>
            <input
              type="text"
              name="neighborhood"
              placeholder="Ex: São Miguel"
              value={userRegister.neighborhood}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  neighborhood: e.target.value,
                }))
              }
            />
            <label htmlFor="street">Rua</label>
            <input
              type="text"
              name="street"
              placeholder="Ex: Rua Euclide Pacheco"
              value={userRegister.street}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
            />
            <label htmlFor="numberHome">Número</label>
            <input
              type="text"
              name="numberHome"
              placeholder="Ex: 44"
              value={userRegister.numberHome}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  numberHome: e.target.value,
                }))
              }
            />
            <label htmlFor="zipCode">CEP</label>
            <input
              type="text"
              name="zipCode"
              placeholder="Ex: 0000 000"
              value={userRegister.zipCode}
              onChange={(e) =>
                setUserRegister((prev) => ({
                  ...prev,
                  zipCode: e.target.value,
                }))
              }
            />
            <label htmlFor="password">Senha</label>
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
            <label htmlFor="confirmPassword">Confime a senha</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Insira sua senha novamente"
              value={userRegister.confirmPassword}
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
