import { useDispatch, useSelector } from 'react-redux';
import './assets/styles/style.css';
import { State } from '../../types/state';
import {
  FaGift,
  FaImage,
  FaMoneyBillWave,
  FaStar,
  FaStarHalf,
} from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Dispatch } from 'redux';

import * as actionsAuth from '../../store/modules/auth/actionsCreatores';

import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import axios from '../../services/axios';
import Vacancy from '../../types/vacancy';
export function IndexMotoboy() {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: State) => state.login.isLoggedin.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vacancy, setVacancy] = useState<Vacancy[]>([]);

  useEffect(() => {
    async function getData() {
      if (!user) return <Navigate to={'/login'} />;
      if (user.business) return <Navigate to={'/index-business'} />;
      try {
        setIsLoading(true);
        const response = await axios.get(`/vacancy`);
        setVacancy(response.data);
        setIsLoading(false);
      } catch (error: any) {
        if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, faça login novamente!',
          }).then((result) => {
            if (result.isConfirmed) {
              return dispatch(
                actionsAuth.loginFailure('Faça login novamente!'),
              );
            }
          });
          setIsLoading(false);
        }
      }
    }
    getData();
  }, [dispatch, user]);

  return (
    <div className="index-motoboy">
      <Loading isLoading={isLoading} />
      {vacancy.map((vacancy) => (
        <div className="vacancy-container" key={vacancy.id}>
          <div className="info-restaurant">
            <div className="logo-restaurant">
              <FaImage size={150} />
            </div>
            <p>Restaurant-name</p>
            <div className="rating-restaurant">
              <span>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStarHalf size={15} />
              </span>
            </div>

            <div className="description-vacancy">
              <p className="title-vacancy">
                <MdLocationOn size={15} />
                Guarulhos-SP
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
            </div>

            <div className="buttons-controls">
              <button className="btn-white">Detalhes</button>
              <button className="btn-black">Candidatar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
