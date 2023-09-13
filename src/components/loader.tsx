import React from 'react';
import { CircularProgress, styled } from '@mui/material';

const LoaderWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

export const Loader = () => (
  <LoaderWrapper>
    <CircularProgress />
  </LoaderWrapper>
);
