import { configureStore } from '@reduxjs/toolkit';

import catsReducer from './reducers/catsReducer';

export const store = configureStore({
  reducer: {
    catsReducer,
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
