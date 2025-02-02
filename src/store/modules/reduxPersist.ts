import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers: any) => {
  const persistedReducers = persistReducer(
    {
      key: 'motoFreela',
      storage,
      whitelist: ['login'],
    },
    reducers,
  );
  return persistedReducers;
};
