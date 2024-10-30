import React from 'react';
import { observer } from 'mobx-react-lite';
import { Movie, moviesStore } from '../stores/moviesStore';
import { favoritesStore } from '../stores/favoritesStore';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = observer(({ movie, isFavorite = false }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isFavorite) {
      favoritesStore.removeFavorite(movie.imdbID);
    } else {
      favoritesStore.addFavorite(movie);
    }
  };

  const handleClick = () => {
    moviesStore.setCurrentMovie(movie);
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <Card sx={{
      maxWidth: { xs: 'auto', sm: 345 },
      margin: 'auto',
      boxShadow: 3,
      paddingBottom: 1,
    }}>
      <CardMedia
        component="img"
        height="350"
        image={movie.Poster}
        alt={movie.Title}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Year}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.Genre ? movie.Genre : 'Not found'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={handleAction}
          fullWidth
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardActions>
    </Card>
  );
});

export default MovieCard;
