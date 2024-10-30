import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { moviesStore } from '../stores/moviesStore';
import { CardMedia, CardContent, Typography, Box } from '@mui/material';


const MovieDetail: React.FC = observer(() => {
  const [trailerUrl, setTrailerUrl] = React.useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const movie = moviesStore.currentMovie;
  const localStorageKey = `movieTime_${movie?.Title}`;

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movie) {
        if (id) {
          await moviesStore.fetchMovieById(id);
        }
      }
    };

    fetchMovie();
  }, [movie, id]);

  useEffect(() => {
    if (movie?.trailerURL) {
      setTrailerUrl(movie.trailerURL)
    }
  }, [movie]);

  if (!movie) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '1260px',
        margin: 'auto',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <CardMedia
        component="img"
        image={movie.Poster}
        alt={movie.Title}
        sx={{
          width: { xs: '100%', md: '300px' },
          height: 'auto',
          borderRadius: 1,
        }}
      />
      <CardContent sx={{ flexGrow: 1, marginLeft: { md: 2 }, padding: 2 }}>
        <Typography variant="h4" component="div" gutterBottom>
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          Year: {movie.Year}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          Genre: {movie.Genre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          Director: {movie.Director}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          IMDb Rating: {movie.imdbRating}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {movie.Plot}
        </Typography>
        {trailerUrl ? (
          <iframe
            src={trailerUrl}
            title="Video"
            style={{ width: '100%', height: '400px', border: 'none', marginTop: '20px' }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary" style={{ marginTop: '20px' }}>
            No trailer found for this movie.
          </Typography>
        )}

      </CardContent>
    </Box>
  );
});

export default MovieDetail;
