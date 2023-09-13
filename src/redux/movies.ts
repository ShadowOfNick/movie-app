import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resultsProps } from './search';

export interface MoviesDataPayload {
  results: resultsProps[];
  page: number;
  total_results: number;
  total_pages: number;
};

export interface MovieState {
  results: resultsProps[];
  hasMore: boolean;
  totalResults: number;
  page: number;
  totalPages: number;
  isFetching: boolean;
};

const initialState: MovieState = {
  results: [],
  hasMore: false,
  totalResults: 0,
  page: 0,
  totalPages: 0,
  isFetching: false,
};

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    getPopularMovies: (state, action: PayloadAction<number>): MovieState => {
      return {
        ...state,
        isFetching: true,
        page: action.payload,
      };
    },
    fetchedPopularMovies: (state, action: PayloadAction<MoviesDataPayload>): MovieState => {
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        hasMore: action.payload.page < action.payload.total_pages,
        totalResults: action.payload.total_results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
        isFetching: false,
      };
    },
    resetState: (): MovieState => {
      return initialState;
    },
  },
});

export const { getPopularMovies, fetchedPopularMovies, resetState } = moviesSlice.actions;

export default moviesSlice.reducer;
