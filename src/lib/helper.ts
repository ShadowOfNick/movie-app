import { MovieState } from '../redux/movie';
import { resultsProps } from '../redux/search';

interface Genre {
  id: number;
  name: string;
};

export interface PopularMovies {
  id: number;
  title: string;
  poster_path: string | null;
  genre_ids: number[];
};

export const mapGenres = (ids: number[], genres: Genre[]): string => {
  const genresMap: Record<number, string> = genres.reduce((result, current) => {
    result[current.id] = current.name;
    return result;
  }, {} as Record<number, string>);

  return ids.map(id => genresMap[id]).join(', ');
};

export const mapPopularMovies = (movies: resultsProps[]): PopularMovies[] => movies.map((item) => ({
  title: item.title,
  poster_path: item.poster_path || null,
  genre_ids: item.genre_ids || null,
  id: item.id,
}));

export const mapMovie = (movie: MovieState): PopularMovies => ({
  title: movie.title,
  poster_path: movie.poster_path || null,
  genre_ids: movie.genres.map((genre) => genre.id),
  id: movie.id,
});
