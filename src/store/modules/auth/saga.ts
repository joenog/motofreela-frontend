import { takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../../services/axios';
import * as actions from './actionsCreatores';
import * as actionsTypes from './actionsTypes';
import Swal from 'sweetalert2';

function* efetuarLoginSaga(payload: any): any {
  try {
    yield call(axios.post, '/login-motoboy', {
      email: payload.payload.loginRequest?.email,
      password: payload.payload.loginRequest?.password,
    });
    const userResponse = yield call(axios.get, `/user-motoboy/searchForEmail/${payload.loginRequest}`)
    const user = userResponse.data;
    yield put(
      actions.loginSuccess({
        isLoggedIn: true,
        user: {
          id: user[0].id,
          name: user[0].nome,
          email: user[0].email,
        },
      }),
    );
    Swal.fire({
      icon: 'success',
      title: 'sucesso!',
      text: 'Você fez login com sucesso!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
      }
    });
  } catch (error: any) {
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