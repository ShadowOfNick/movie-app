import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenreItemProps } from './genres';
import { resultsProps } from './search';

interface RecommendationsProps {
  results: resultsProps[];
  totalResults: number;
  page: number;
  totalPages: number;
};

export interface MovieState {
  adult: boolean;
  genres: GenreItemProps[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  isFetching: boolean;
  overview: string | null;
  popularity: number | null;
  poster_path: string | null;
  production_countries: {
    name: string;
  }[] | null;
  recommendations: RecommendationsProps | null;
  release_date: string | null;
  runtime: number | null;
  status: string | null;
  title: string;
  tagline: string | null;
  vote_average: number | null;
  vote_count: number | null;
  hasMore: boolean;
};

const initialState: MovieState = {
  recommendations: {
    results: [],
    totalResults: 0,
    page: 0,
    totalPages: 0,
  },
  isFetching: false,
  hasMore: false,
  adult: false,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  overview: '',
  popularity: 0,
  poster_path: null,
  release_date: '',
  status: '',
  tagline: '',
  vote_average: 0,
  vote_count: 0,
  title: '',
  production_countries: [],
  runtime: 0
};

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    getMovie: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        isFetching: true,
      }
    },
    fetchedMovie: (state, action) => {
      return {
        ...state,
        ...action.payload,
        recommendations: {
          ...action.payload.recommendations,
          results: action.payload.recommendations.results.slice(0, 10)
        },
        isFetching: false,
      }
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { getMovie, fetchedMovie, resetState } = movieSlice.actions;

export default movieSlice.reducer;
