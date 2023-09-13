import { GenreItemProps } from '../redux/genres';
import { resultsProps } from '../redux/search';

interface PopularMoviesResponse {
  results: resultsProps[];
  page: number;
  total_results: number;
  total_pages: number;
};

interface SearchMoviesResponse {
  results: resultsProps[];
};

interface GenresResponse {
  genres: GenreItemProps[];
};

export default class TheMovieDbApi {
  private apiBaseUrl = 'https://api.themoviedb.org/3';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  };

  public getPopularMovies = async (page: number): Promise<PopularMoviesResponse> => {
    const resp = await fetch(
      `${this.apiBaseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );

    return resp.json();
  };

  public getMovie = async (id: number): Promise<PopularMoviesResponse> => {
    const resp = await fetch(
      `${this.apiBaseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=recommendations`
    );

    return resp.json();
  };

  public searchMovies = async (query: string): Promise<SearchMoviesResponse> => {
    const resp = await fetch(
      `${this.apiBaseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );

    return resp.json();
  };

  public getGenres = async (): Promise<GenresResponse> => {
    const resp = await fetch(
      `${this.apiBaseUrl}/genre/movie/list?api_key=${this.apiKey}`
    );

    return resp.json();
  };
};
