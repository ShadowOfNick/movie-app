import { createSlice } from '@reduxjs/toolkit';

export interface GenreItemProps {
  id: number;
  name: string;
};

export interface GenresProps {
  genres: GenreItemProps[];
  isFetching: boolean;
};

const initialState: GenresProps = {
  genres: [],
  isFetching: false,
};

const genresSlice = createSlice({
  name: 'genresSlice',
  initialState,
  reducers: {
    getGenres: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedGenres: (state, action) => {
      return {
        ...state,
        genres: action.payload.genres,
        isFetching: false,

      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { getGenres, fetchedGenres, resetState } = genresSlice.actions;

export default genresSlice.reducer;
