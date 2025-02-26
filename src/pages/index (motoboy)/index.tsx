/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Dispatch } from 'redux';
import { FaGift, FaImage, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import Swal from 'sweetalert2';

import * as actionsAuth from '../../store/modules/auth/actionsCreatores';

import Loading from '../../components/Loading';

import { State } from '../../types/state';
import axios from '../../services/axios';
import useBusinessData from '../../hooks/useBusinessData';
import useVacancyData from '../../hooks/useVacancyData';
import filtrarUserBusinessPorId from '../../utils/filtrarBusinessPorId';
import './assets/styles/style.css';

export function IndexMotoboy() {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: State) => state.login.isLoggedin.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seeDetails, setSeeDetails] = useState<boolean[]>([]);
  const business = useBusinessData().businesses;

  if (!user) return <Navigate to="/login" />;

  async function applyVacancy(vacancy_id: number) {
    if (!vacancy_id) return;

    try {
      setIsLoading(true);
      await axios.post(`/candidatos/`, {
        vacancy_id,
        motoboy_id: user?.id,
      });

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Candidatura enviada com sucesso!',
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, faça login novamente!',
        }).then((result) => {
          if (result.isConfirmed) {
            return dispatch(actionsAuth.loginFailure('Faça login novamente!'));
          }
        });
      } else if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.errors || 'Ocorreu um erro inesperado!',
        });
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.errors || 'Ocorreu um erro inesperado!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="index-motoboy">
      <Loading isLoading={useVacancyData().isLoading || isLoading} />
      {useVacancyData().vacancies.map((vacancy) => (
        <div className="vacancy-container" key={vacancy.id}>
          <div className="info-restaurant">
            <div className="logo-restaurant">
              {filtrarUserBusinessPorId(vacancy.business_id, business)
                ?.photoURL ? (
                <img
                  src={
                    filtrarUserBusinessPorId(vacancy.business_id, business)
                      ?.photoURL
                  }
                  alt="logo-restaurant"
                />
              ) : (
                <FaImage size={150} />
              )}
            </div>
            <p>
              {filtrarUserBusinessPorId(vacancy.business_id, business)?.name}
            </p>
            <div className="rating-restaurant">
              <span>
                {Array.from({
                  length:
                    filtrarUserBusinessPorId(vacancy.business_id, business)
                      ?.stars || 0,
                }).map((_, i) => (
                  <FaStar key={i} size={15} />
                ))}
              </span>
            </div>

            <div className="description-vacancy">
              <p className="title-vacancy">
                <MdLocationOn size={15} />
                {
                  filtrarUserBusinessPorId(vacancy.business_id, business)?.city
                }{' '}
                -{' '}
                {filtrarUserBusinessPorId(vacancy.business_id, business)?.state}
              </p>

              <p className="time">
                <AiOutlineClockCircle size={15} /> {vacancy.time}
              </p>

              <p className="additional">
                <FaMoneyBillWave size={15} />{' '}
                {vacancy.price ? vacancy.price + ' +' : ''}{' '}
                {vacancy.additional ? vacancy.additional + ' por entrega' : ''}
              </p>

              <p className="benefits">
                <FaGift size={15} /> Refeição no local
              </p>

              {seeDetails[vacancy.id] ? (
                <p className="description">
                  <span style={{ fontWeight: 'bold' }}>Descrição:</span>
                  <br />
                  {vacancy.description}
                </p>
              ) : null}
            </div>

            <div className="buttons-controls">
              <button
                className="btn-white"
                onClick={() =>
                  setSeeDetails({
                    ...seeDetails,
                    [vacancy.id]: !seeDetails[vacancy.id],
                  })
                }
              >
                {seeDetails[vacancy.id] ? 'Ocultar' : 'Ver detalhes'}
              </button>
              <button
                className="btn-black"
                onClick={() => applyVacancy(vacancy.id)}
              >
                Candidatar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
