import React from 'react';
import { TextField, Paper, MenuItem, Grid, styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { MoviesProps, searchMovies } from '../redux/search';
import Downshift from 'downshift';
import { Link } from 'react-router-dom';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../config';
import { mapGenres } from '../lib/helper';
import { GenreItemProps } from '../redux/genres';

interface SuggestionProps {
  movies: MoviesProps
  genres: GenreItemProps[];
};

const StyledPaper = styled(Paper)({
  backgroundColor: '#5d3c18',
  top: -40,
  position: 'relative',
});

const StyledMenuItem = styled(MenuItem)({
  paddingTop: 5,
  paddingBottom: 5,
});

const StyledImage = styled('img')({
  height: '100%',
});

const StyledLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
});

const StyledTitle = styled(Typography)({
  color: '#121212',
  paddinTop: 10,
});

const StyledCaption = styled(Typography)({
  color: '#121212',
});

export const Suggestion: React.FC<SuggestionProps> = ({
  movies,
  genres,
}) => {
  const dispatch = useDispatch();

  const inputOnChange = (event: any) => {
    const { value } = event.target;
    if (!value) {
      return;
    }
    dispatch(searchMovies(value));
  };

  const itemToString = () => '';

  return (
    <Downshift itemToString={itemToString}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <TextField
            id="search"
            placeholder="Search"
            fullWidth
            sx={{ mb: 5 }}
            type="search"
            variant="standard"
            InputProps={{
              inputProps: getInputProps({
                onChange: inputOnChange,
              }),
            }}
          />

          {isOpen ? (
            <StyledPaper square {...getMenuProps()}>
              {movies.results.slice(0, 10)
                .filter((item) => (
                  !inputValue ||
                  item.title.toLowerCase().includes(inputValue.toLowerCase())
                )).map((item, index) => (
                  <StyledMenuItem
                    {...getItemProps({
                      item,
                      index,
                      selected: highlightedIndex === index,
                      style: {
                        fontWeight: selectedItem === item ? 500 : 400,
                      },
                    })}
                  >
                    <StyledLink to={`/movie/${item.id}`}>
                      <Grid container spacing={2}>
                        <Grid item>
                          {item.poster_path ? (
                            <StyledImage
                              src={`${IMAGES_PATH}/w92${item.poster_path}`}
                              alt={item.title}
                            />
                          ) : (
                            <StyledImage src={COVER_PLACEHOLDER} alt={item.title} />
                          )}
                        </Grid>

                        <Grid item>
                          <StyledTitle variant='h4'>
                            {item.title}
                          </StyledTitle>

                          <StyledCaption variant='caption'>
                            {mapGenres(item.genre_ids, genres)}
                          </StyledCaption>
                        </Grid>
                      </Grid>
                    </StyledLink>
                  </StyledMenuItem>
                ))}
            </StyledPaper>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
