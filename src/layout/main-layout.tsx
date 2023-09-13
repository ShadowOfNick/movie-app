import React, { ReactNode } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import { styled } from '@mui/system';
import { SearchMovieSuggestion } from '../components';

interface MainLayoutProps {
  children: ReactNode;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledLink = styled(Link)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#f2f2f2',
  textDecoration: 'none',
});

const LayoutWrapper = styled(Box)(({theme}) => ({
  margin: '24px',
  width: 'auto',
  [theme.breakpoints.up('lg')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.breakpoints.values.lg,
  },
}));

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />

    <LayoutWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledLink to='/'>
          <MovieIcon fontSize='large'/>

          <Typography variant='h4' marginLeft={2}>
            Movie App
          </Typography>
        </StyledLink>
      </Box>

      <SearchMovieSuggestion />

      {children}
    </LayoutWrapper>
  </ThemeProvider>
);
