import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovie, resetState } from '../redux/movie';
import { RootState } from '../redux/store';
import { Loader, Movie } from '../components';

export const MovieDetails: React.FC = () => {
  const { movie } = useSelector((state: RootState) => state);
  const { genres } = useSelector((state: RootState) => state.genres);
  
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getMovie(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id && movie.id?.toString() !== id) {
      dispatch(getMovie(parseInt(id, 10)));
    }
  }, [id, movie.id, dispatch]);

  return (
    movie.isFetching ? <Loader /> : <Movie movie={movie} genres={genres} />
  );
};
