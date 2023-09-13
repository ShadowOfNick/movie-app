import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import searchReducer from './search';
import genresReducer from './genres';
import moviesReducer from './movies';
import movieReducer from './movie';
import favoritesReducer from './favorites';
import watcherSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  search: searchReducer,
  genres: genresReducer,
  movies: moviesReducer,
  movie: movieReducer,
  favorites: favoritesReducer,
});

const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(middlewares),
});

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
