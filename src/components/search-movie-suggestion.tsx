import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Suggestion } from './suggestion';

export const SearchMovieSuggestion: React.FC = () => {
  const { search } = useSelector((state: RootState) => state);
  const { genres } = useSelector((state: RootState) => state.genres);

  return (
    <Suggestion
      movies={search}
      genres={genres}
    />
  );
};
