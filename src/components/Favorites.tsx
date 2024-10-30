import React from 'react';
import { observer } from 'mobx-react-lite';
import { favoritesStore } from '../stores/favoritesStore';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

const Favorites: React.FC = observer(() => {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, sm: 8, md: 20 }}
      sx={{
        mx: 'auto',
        width: '100%',
        maxWidth: { xs: '100%', md: '1260px' }
      }}
    >
      {favoritesStore.favorites.length > 0 ? (
        favoritesStore.favorites.map((movie) => (
          <Grid size={4} key={movie.imdbID}>
            <MovieCard movie={movie} isFavorite />
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mx: 'auto', textAlign: 'center', width: '100%' }}>
          No movies were added to favourites.
        </Typography>
      )}
    </Grid>

  );
});

export default Favorites;
