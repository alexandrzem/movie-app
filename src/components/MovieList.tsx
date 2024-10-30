import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { moviesStore } from '../stores/moviesStore';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

const MovieList: React.FC = observer(() => {
  useEffect(() => {
    moviesStore.fetchMovies();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, sm: 8, md: 12, xl: 20 }}
      sx={{
        mx: 'auto',
        width: '100%',
        maxWidth: { xs: '100%', md: '1260px' }
      }}
    >
      {moviesStore.movies.length > 0 ? (
        moviesStore.movies.map((movie) => (
          <Grid size={4} key={movie.imdbID}>
            <MovieCard movie={movie} />
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mx: 'auto', textAlign: 'center', width: '100%' }}>
          No movies found.
        </Typography>
      )}
    </Grid>
  );
});

export default MovieList;
