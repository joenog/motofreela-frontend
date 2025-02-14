import { Link } from 'react-router-dom';
import notFound from './notFound.module.css';
import motoPacotesError from '../notFound/images/home-moto-pacotes-error.png';

export function NotFound() {
  return (
    <>
      <main className={notFound.container}>
        <img className={notFound.imgError} src={motoPacotesError} alt="" />
        <h2 className={notFound.textNotFound}>
          Caminho errado, tente algo diferente :/
        </h2>
        <Link className={notFound.linkInicio} to={'/'}>
          Ir ao ínicio
        </Link>
      </main>
      <footer>
        <a href=""></a>
      </footer>
    </>
  );
}
