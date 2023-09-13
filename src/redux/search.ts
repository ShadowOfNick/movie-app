import { createSlice } from '@reduxjs/toolkit';

export interface resultsProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface MoviesProps {
  results: resultsProps[];
  totalResults: number;
  page: number;
  totalPages: number;
  isFetching: boolean;
};

const initialState: MoviesProps  = {
  results: [],
  totalResults: 0,
  page: 0,
  totalPages: 0,
  isFetching: false,
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    searchMovies: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedSearchMovies: (state, action) => {
      return {
        ...state,
        isFetching: false,
        results: action.payload.results,
        totalResults: action.payload.total_results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { searchMovies, fetchedSearchMovies, resetState } = searchSlice.actions;

export default searchSlice.reducer;
