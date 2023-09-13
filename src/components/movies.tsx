import React, { useState } from 'react';
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IMAGES_PATH, COVER_PLACEHOLDER } from '../config';
import { GenreItemProps } from '../redux/genres';
import { mapGenres, PopularMovies } from '../lib/helper';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/favorites';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface MoviesProps {
  movies: PopularMovies[];
  genres: GenreItemProps[];
};

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledImageListItem = styled(ImageListItem)({
  overflow: 'hidden',
});

export const Movies: React.FC<MoviesProps> = ({
  movies,
  genres,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const [movieList, setMovieList] = useState<PopularMovies[]>([]);
  
  const hasMovie = (movie: PopularMovies) => {
    return favorites.some((item: PopularMovies) => item.id === movie.id);
  }
    
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
    setMovieList(favorites);
  };
  console.log(movieList);
  return (
    <ImageList cols={matchDownSm ? 1 : (matchDownMd ? 3 : 5)} rowHeight={365} gap={12}>
      {movies.map((movie, index) => (
        <StyledImageListItem key={index}>
          <Link to={`/movie/${movie.id}`}>
            {movie.poster_path ? (
              <StyledImage
                src={`${IMAGES_PATH}/w300/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <StyledImage
                src={COVER_PLACEHOLDER}
                alt={movie.title}
              />
            )}
          </Link>
          <ImageListItemBar
            title={movie.title}
            subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
            actionIcon={
              <IconButton
                onClick={() => toggleFavorite(movie)}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label="add-to-favorite"
              >
                {hasMovie(movie) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            }
          />
        </StyledImageListItem>
      ))}
    </ImageList>
  );
};
