import { BiDollarCircle } from 'react-icons/bi';
import styles from './relatorioMotoboy.module.css';
import { MdLocalPostOffice } from 'react-icons/md';
import FetchVacancy from '../../hooks/FetchVacancy';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import FetchHired from '../../hooks/FetchHired';
import { filtrarVagasFinalizadasMotoboy } from '../../utils/filtrarVagasFinalizadasMotoboy';
import { numeroParaMoeda } from '../../utils/numeroParaMoeda';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';

import voidImg from '../../assets/images/void_img.png';

export default function RelatoriosMotoboy() {
  const user = useSelector((state: State) => state.login.isLoggedin.user);
  const vacancies = FetchVacancy();
  const hired = FetchHired();
  const vagasFinalizadas = filtrarVagasFinalizadasMotoboy(
    user?.id as number,
    vacancies.vacancies,
    hired.hired,
  );
  const [seeDetails, setSeeDetails] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalDeGanhos = vagasFinalizadas.reduce((acc, vaga) => {
    return acc + parseFloat(vaga.price) + parseFloat(vaga.additional);
  }, 0);

  useEffect(() => {
    if (vacancies.isLoading || hired.isLoading) return setIsLoading(true);
    setIsLoading(false);
  }, [hired.isLoading, vacancies.isLoading]);

  return (
    <div className={styles.relatoriosMotoboy}>
      <Loading isLoading={isLoading} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p>
              <i className={styles.icon}>
                <BiDollarCircle />
              </i>
              <strong>{numeroParaMoeda.format(totalDeGanhos)}</strong>
            </p>
          </div>
          <div className={styles.content}>
            <p>
              <i className={styles.icon}>
                <MdLocalPostOffice />
              </i>
              Trabalhos finalizados:
            </p>
          </div>
          <div className={styles.content}>
            <p>
              <strong>{vagasFinalizadas.length}</strong>
            </p>
          </div>
        </div>
        {vagasFinalizadas
          ? vagasFinalizadas.map((vaga) => (
              <>
                <div className={styles.box}>
                  <div className={styles.boxGrid}>
                    <div
                      className={
                        styles.boxContent + ' ' + styles.boxContentStatus
                      }
                    >
                      <span
                        className={
                          vaga.status === 'Finalizada'
                            ? styles.tag + ' ' + styles.tagDone
                            : styles.tag
                        }
                      >
                        {vaga.status}
                      </span>

                      <span className={styles.tag + ' ' + styles.tagInfo}>
                        Motoboy: {user?.name}
                      </span>

                      <span className={styles.tag}>
                        {numeroParaMoeda.format(parseFloat(vaga.price))}
                      </span>
                    </div>
                    <div className={styles.boxContent}>
                      <p>Horário: {vaga.time}</p>
                      <p>
                        Adicional:{' '}
                        {numeroParaMoeda.format(parseFloat(vaga.additional))}
                      </p>
                      <p>Beneficios: {vaga.benefits}</p>
                    </div>
                  </div>

                  {seeDetails[vaga.id] ? (
                    <div className={styles.description}>
                      <strong>Descrição:</strong> <br />
                      <p>{vaga.description}</p>
                    </div>
                  ) : null}

                  <div
                    className={styles.buttons}
                    onClick={() =>
                      setSeeDetails({
                        ...seeDetails,
                        [vaga.id]: !seeDetails[vaga.id],
                      })
                    }
                  >
                    <button className={styles.btnWhite}>
                      {seeDetails[vaga.id] ? 'Ver Menos' : 'Ver detalhes'}
                    </button>
                  </div>
                </div>
              </>
            ))
          : null}
        <div className={styles.void}>
          <p>Não mais vagas para exibir</p>
          <img src={voidImg} className={styles.voidImg} alt="void" />
        </div>
      </div>
    </div>
  );
}
