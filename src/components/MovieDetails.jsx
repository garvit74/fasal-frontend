import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddMovieToList from './AddMovieToList';

const YOUR_OMDB_API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <Card raised sx={{ my: 4 }}>
        <CardMedia
          component="img"
          image={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400x400'}
          alt={movie.Title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{movie.Title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{movie.Year}</Typography>
          <Typography variant="body1" paragraph>{movie.Plot}</Typography>
          <AddMovieToList movie={movie} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;
