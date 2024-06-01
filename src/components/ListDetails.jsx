import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';

const ListDetails = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
   
  }, [listId]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">{list.name}</Typography>
      <Grid container spacing={3}>
        {list.movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{movie.Title}</Typography>
                <Typography variant="subtitle1">{movie.Year}</Typography>
                <Button onClick={()=> Navigate(`/movie/${movie.imdbID}`)} variant="contained">View Details</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListDetails;
