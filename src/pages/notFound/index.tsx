import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <>
      <main>
        <h1>Algo está errado ://</h1>
        <Link className="linkInicio" to={'/'}>
          Ínicio
        </Link>
      </main>
    </>
  );
}
