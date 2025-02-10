import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import '../../styles/globalStyle.css';
import imgMoto from './images/home-moto-pacotes.png';
import logoMotoca from './images/logo-motoca.png';
import nomeRapido from './images/rapido.png';
import nomeLivre from './images/livre.png';
import { Link } from 'react-router-dom';

export function Home() {
  //CHANGE IMAGE
  const images = [imgMoto, nomeRapido, nomeLivre];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <>
      <header>
        <img src={logoMotoca} alt="logo-moto-freela" />
      </header>

      <main>
        <div>
          <img
            className={styles.imgMoto}
            src={images[currentImage]}
            alt="img-moto"
          />
        </div>

        <div className="btn-home">
          <button className="btn-black">Para Empresas</button>
          <button className="btn-white">Para Motoboys</button>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Todos os direitos reservados | © Motoca</p>
        <p>
          <Link className={styles.sobre} to={'/*'}>
            | Sobre |
          </Link>
        </p>
      </footer>
    </>
  );
}
