import React from 'react';
import { observer } from 'mobx-react-lite';
import { moviesStore } from '../stores/moviesStore';
import { AppBar, Toolbar, TextField, Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = observer(() => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const location = useLocation();
  const isMovieDetailPage = location.pathname.includes('/movie/');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      moviesStore.setSearchQuery(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        marginBottom: 4,
        mx: 'auto',
        width: '100%',
        maxWidth: { xs: '100%', md: '1260px' }
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
            MovieApp
          </Button>
        </Typography>
        {!isMovieDetailPage && (
          <TextField
            label=""
            placeholder='Search for movies...'
            variant="standard"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: 'white', marginRight: 2, paddingTop: '2px' }}
          />
        )}
        <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/favorites" sx={{ textTransform: 'none' }}>
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
