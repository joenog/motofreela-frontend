import { takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../../services/axios';
import * as actions from './actionsCreatores';
import * as actionsTypes from './actionsTypes';
import Swal from 'sweetalert2';

function* efetuarLoginSaga(payload: any): any {
  try {
    const { email } = payload.payload.loginRequest;
    const { password } = payload.payload.loginRequest;
    const { business } = payload.payload.loginRequest;

    if (!business) {
      if (email && password) {
        yield call(axios.post, '/login-motoboy', {
          email: email,
          password: password,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, preencha todos os campos!',
        });
      }
      const userResponse = yield call(
        axios.get,
        `/user-motoboy/searchForEmail/${email}`,
      );
      const user = userResponse.data;
      if (user) {
        yield put(
          actions.loginSuccess({
            isLoggedIn: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              business: false,
            },
          }),
        );
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Você logou com sucesso!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/index-motoboy';
          }
        });
      }
    } else {
      if (email && password) {
        yield call(axios.post, '/login-business', {
          email: email,
          password: password,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, preencha todos os campos!',
        });
      }
      const userResponse = yield call(
        axios.get,
        `/user-business/searchForEmail/${email}`,
      );
      const user = userResponse.data;
      if (user) {
        yield put(
          actions.loginSuccess({
            isLoggedIn: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              business: true,
            },
          }),
        );
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You have successfully logged in!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/index-business';
          }
        });
      }
    }
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: error.response.data.errors as string,
    });
    yield put(actions.loginFailure(error as string));
  }
}

function* loginSaga() {
  yield takeLatest(actionsTypes.LOGIN_REQUEST, efetuarLoginSaga);
}

export default loginSaga();
