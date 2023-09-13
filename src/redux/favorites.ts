import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteMovies {
  title: string;
  poster_path: string | null;
  id: number;
};
const initialFavoritesState: FavoriteMovies[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialFavoritesState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteMovies>) => {
      state.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<FavoriteMovies>) => {
      return state.filter((movie) => movie !== action.payload);
    },
    resetState: () => {
      return initialFavoritesState;
    },
  },
});

export const { addToFavorites, removeFromFavorites, resetState } = favoritesSlice.actions;

export default favoritesSlice.reducer;
