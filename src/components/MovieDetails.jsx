import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent, CardMedia,
  CircularProgress, Box, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, List, ListItem,
  ListItemText, ListItemButton, DialogActions
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { addMovieToList, getallLists, createList } from '../api'; // Ensure these are correctly implemented

const YOUR_OMDB_API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [listsAvailable, setListsAvailable] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${YOUR_OMDB_API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const fetchLists = async () => {
    try {
      const response = await getallLists(token); // Adjust this according to your API structure
      setLists(response);
      setListsAvailable(response.length > 0); // Check if there are any lists available
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const handleClickOpen = () => {
    fetchLists();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMovieToList = async (listId) => {
    try {
      const movieToAdd = {
        title: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        poster: movie.Poster
      };
      const result = await addMovieToList(movieToAdd, listId, token);
      alert('Movie added successfully');
      handleClose();
    } catch (error) {
      alert('Failed to add movie');
      console.error(error);
    }
  };

  const handleCreateList = async () => {
    try {
      // Implement createList function in your API
      const newList = await createList(token); 
      alert('List created successfully');
      setLists([newList]); // Add the new list to the existing lists
      setListsAvailable(true); // Now there is a list available
      handleClose();
    } catch (error) {
      alert('Failed to create list');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Container>
        <Card raised sx={{ my: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CardMedia
            component="img"
            image={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400x400'}
            alt={movie.Title}
            sx={{ width: { xs: '100%', md: 'auto' }, height: 'auto', objectFit: 'contain' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>{movie.Title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{movie.Year}</Typography>
              <Typography variant="body1" paragraph>{movie.Plot}</Typography>
              <Button variant="contained" onClick={handleClickOpen}>
                Add to List
              </Button>
            </CardContent>
          </Box>
        </Card>
      </Container>

      {/* Dialog for selecting list */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{listsAvailable ? "Select List" : "Create New List"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {listsAvailable ? "Choose a list to add this movie to:" : "You don't have any lists. Create a new list:"}
          </DialogContentText>
          {listsAvailable ? (
            <List>
              {lists.map((list) => (
                <ListItem key={list.id}>
                  <ListItemButton onClick={() => handleAddMovieToList(list.id)}>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Button variant="contained" onClick={handleCreateList}>
              Create List
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MovieDetails;
