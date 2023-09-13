import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Movies } from '../components';
import { getPopularMovies, resetState } from '../redux/movies';
import { RootState } from '../redux/store';

export const FavoritesMovies: React.FC = () => {
  const { genres } = useSelector((state: RootState) => state.genres);
  const dispatch = useDispatch();
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  useEffect(() => {
    dispatch(getPopularMovies(1));
    return () => {
      dispatch(resetState());
    }
  }, [dispatch]);

  return (
    <>
      <Typography component="h2" variant="h3" gutterBottom>
        Favorite Movies
      </Typography>
      {favorites.length === 0 ? ( 
        <Typography component="h3" variant="h4" gutterBottom>
          You don't have any favorite movies
        </Typography>
      ) : (
        <Movies movies={favorites} genres={genres}/>
      )}
    </>
  );
};
