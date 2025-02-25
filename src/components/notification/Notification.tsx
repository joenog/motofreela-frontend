import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state';
import { Dispatch } from 'redux';
import * as actionsAuth from '../../store/modules/auth/actionsCreatores';
import axios from '../../services/axios';
import NotificationType from '../../types/notification';
import PropTypes from 'prop-types';

import './assets/styles/notification.css';
import { TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';

import imgVoid from '../../assets/images/void_img.png';

export default function Notification({
  showNotificaton,
}: {
  showNotificaton: boolean;
}) {
  const dispatch: Dispatch<any> = useDispatch();
  const [notification, setNotification] = useState<NotificationType[]>([]);
  const user = useSelector((state: State) => state.login.isLoggedin.user);

  useEffect(() => {
    async function getData() {
      try {
        if (!user?.business) {
          const response = await axios.get(`/notification-motoboy/${user?.id}`);
          setNotification(response.data);
        } else if (user?.business) {
          const response = await axios.get(`/notification-business/${user.id}`);
          setNotification(response.data);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          return dispatch(actionsAuth.loginFailure('Faça login novamente!'));
        }
      }
    }
    getData();
  }, [user?.id, user?.business, dispatch]);

  async function handleDelete(id: number) {
    if (!id) return;
    try {
      if (!user?.business) {
        await axios.delete(`/notification-motoboy/${id}`);
        setNotification(notification.filter((item) => item.id !== id));
      } else {
        await axios.delete(`/notification-business/${id}`);
        setNotification(notification.filter((item) => item.id !== id));
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(actionsAuth.loginFailure('Faça login novamente!'));
        return;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.errors || 'Ocorreu um erro inesperado!',
      });
    }
  }

  return (
    <div className={showNotificaton ? 'notification active' : 'notification'}>
      <div className="notificationContent">
        <div className="iconClose"></div>
        {notification.length > 0 ? (
          notification.map((item) => (
            <div key={item.id} className="notificationItem">
              <p>{item.message}</p>
              <div className="iconDelete" onClick={() => handleDelete(item.id)}>
                <TbTrash />
              </div>
            </div>
          ))
        ) : (
          <div className="notificationVoid">
            <p>Não há nenhuma notificação!</p>
            <img src={imgVoid} alt="imagemVoid" />
          </div>
        )}
      </div>
    </div>
  );
}

Notification.propTypes = {
  showNotificaton: PropTypes.bool,
};
