import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { PopularMovies, MovieDetails, FavoritesMovies } from './pages';
import { getGenres } from './redux/genres';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<PopularMovies />}></Route>
          <Route path='/favorites' element={<FavoritesMovies />}></Route>
          <Route path='/movie/:id' element={<MovieDetails />}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
