import { Link } from 'react-router-dom';
import notFound from './notFound.module.css';
import motoPacotesError from '../notFound/images/home-moto-pacotes-error.png';

export function NotFound() {
  return (
    <>
      <main className={notFound.container}>
        <img className={notFound.imgError} src={motoPacotesError} alt="" />
        <h1></h1>
        <h2>Caminho errado, tente algo diferente :/</h2>
        <Link className={notFound.link} to={'/'}>
          Ir ao ínicio
        </Link>
      </main>
      <footer>
        <a href=""></a>
      </footer>
    </>
  );
}
