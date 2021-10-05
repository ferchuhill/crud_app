import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import personSlice from './slice/personSlice';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const reducers = combineReducers({ person: personSlice });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

//Generate the store use to wrapper the page
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk],
  });
}

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
