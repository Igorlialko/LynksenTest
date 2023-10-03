import { configureStore } from '@reduxjs/toolkit';

import catsReducer from './reducers/catsReducer';
import commonReducer from './reducers/commonReducer';

export const store = configureStore({
  reducer: {
    catsReducer,
    commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      //  any middlewares...
    ]),
});

export type TypeRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
