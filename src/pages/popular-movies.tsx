import { Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Movies } from '../components';
import { getPopularMovies, resetState } from '../redux/movies';
import { RootState } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { mapPopularMovies } from '../lib/helper';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const PopularMovies: React.FC = () => {
  const { movies } = useSelector((state: RootState) => state);
  const { genres } = useSelector((state: RootState) => state.genres);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies(1));

    return () => {
      dispatch(resetState())
    }
  }, [dispatch]);

  const loadMore = () => {
    if(movies.hasMore) {
      dispatch(getPopularMovies(movies.page + 1));
    }
  };

  return movies.page === 0 && movies.isFetching 
    ? <Loader />
    : (
      <>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography component="h2" variant="h3" gutterBottom>
              Popular Movies
            </Typography>
          </Grid>

          <Grid item>
            <Link to="/favorites">
              <IconButton
                size='large'
              >
                <FavoriteIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
        <InfiniteScroll
          dataLength={movies.totalResults}
          next={loadMore}
          hasMore={movies.hasMore}
          loader={<Loader />}
          style={{overflow: 'hidden'}}
          endMessage={<p>You have seen it all!!!</p>}
        >
          <Movies movies={mapPopularMovies(movies.results)} genres={genres}/>
        </InfiniteScroll>
      </>
    )
};
