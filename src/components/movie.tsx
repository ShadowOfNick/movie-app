import React from 'react';
import { Grid, IconButton, styled, Typography } from '@mui/material';
import { GenreItemProps } from '../redux/genres';
import { IMAGES_PATH, COVER_PLACEHOLDER } from '../config';
import { MovieState } from '../redux/movie';
import { Movies } from './movies';
import { useDispatch } from 'react-redux';
import { mapMovie, PopularMovies } from '../lib/helper';
import { addToFavorites, removeFromFavorites } from '../redux/favorites';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface MovieProps {
  movie: MovieState;
  genres: GenreItemProps[];
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginBottom: theme.spacing(3),
}));

const StyledImage = styled('img')({
  width: '100%',
});

export const Movie: React.FC<MovieProps> = ({
  movie,
  genres,
}) => {
  const dispatch = useDispatch();
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  const hasMovie = (movie: PopularMovies) => {
    return favorites.some((item: PopularMovies) => item.id === movie.id);
  };
    
  const toggleFavorite = (movie: PopularMovies) => {
    if (hasMovie(movie)) {
      dispatch(removeFromFavorites(movie));
      const updatedFavorites = JSON.stringify(favorites.filter((item: PopularMovies) => item.id !== movie.id));
      localStorage.setItem('favorites', updatedFavorites);
    } else {
      dispatch(addToFavorites(movie));
      const updatedFavorites = JSON.stringify([...favorites, movie]);
      localStorage.setItem('favorites', updatedFavorites);
    }
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = (runtime % 60);
    
    return`${hours}h ${minutes}m`
  };

  return (
    <>
      <StyledGrid container spacing={2}>
        <Grid item md={3}>
          {movie.poster_path ? (
            <StyledImage
              src={`${IMAGES_PATH}/w300${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <StyledImage
              src={COVER_PLACEHOLDER}
              alt={movie.title}
            />
          )}
        </Grid>

        <Grid item md={9}>
          <Typography component='h1' variant='h3'>
            {movie.title}
          </Typography>

          <IconButton
            size='large'
            onClick={() => toggleFavorite(mapMovie(movie))}
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label="add-to-favorite"
          >
            {hasMovie(mapMovie(movie)) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {movie.tagline && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Tagline:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {movie.tagline}
              </Typography>
            </>
          )}

          {movie.genres && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Genre:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </Typography>
            </>
          )}

          {movie.production_countries && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Country:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {movie.production_countries.map((genre) => genre.name).join(', ')}
              </Typography>
            </>
          )}

          {movie.runtime && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Duration:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {formatRuntime(movie.runtime)}
              </Typography>
            </>
          )}

          {movie.release_date && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Release Date:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {new Date(movie.release_date).toLocaleDateString('en-UK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </>
          )}

          {movie.overview && (
            <>
              <Typography component='h3' variant='h6' fontWeight='bold'>
                Overview:
              </Typography>
              <Typography variant='body1' gutterBottom>
                {movie.overview}
              </Typography>
            </>
          )}

        </Grid>
      </StyledGrid>
      {movie.recommendations && (
        <>
          <Typography component='h2' variant='h4' gutterBottom>
            Recomended
          </Typography>
          <Movies
            movies={movie.recommendations.results}
            genres={genres}
          />
        </>
      )}
    </>
  );
};
