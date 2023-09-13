import { delay, all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchedSearchMovies, searchMovies } from '../redux/search';
import { fetchedGenres, getGenres } from '../redux/genres';
import { fetchedPopularMovies, getPopularMovies } from '../redux/movies';
import { fetchedMovie, getMovie } from '../redux/movie';
import { API_KEY } from '../config';
import TheMovieDbApi from '../lib/api';

const api = new TheMovieDbApi(API_KEY);

function* fetchGenres() {
  yield put(fetchedGenres(yield call(api.getGenres)));
};

function* fetchPopularMovies(action) {
  yield put(
    fetchedPopularMovies(
      yield call(api.getPopularMovies, action.payload)
    )
  );
};

function* fetchMovie(action) {
  yield put(
    fetchedMovie(
      yield call(api.getMovie, action.payload)
    )
  );
};

function* fetchSearchMovies(action) {
  yield delay(500);

  yield put(
    fetchedSearchMovies(yield call(api.searchMovies, action.payload))
  );
};

export default function* watcherSaga() {
  yield all([
    yield takeEvery(getMovie.type, fetchMovie),
    yield takeEvery(getPopularMovies.type, fetchPopularMovies),
    yield takeEvery(getGenres.type, fetchGenres),
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
};
