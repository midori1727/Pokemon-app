import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '../features/favoriteSlice';
import caputuredReducer from '../features/capturedSlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage
}

const reducer = combineReducers({
	favorite: favoriteReducer,
	caputured: caputuredReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
});
