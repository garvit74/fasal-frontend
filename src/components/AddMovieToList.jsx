import React, { useState } from "react";
import {
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";

const YOUR_OMDB_API_KEY=process.env.REACT_APP_API_KEY;

function AddMovieToList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);

  const searchMovies = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=${YOUR_OMDB_API_KEY}`
    );
    setMovies(response.data.Search);
  };

  const addMovieToList = (movie, listId) => {
    // Logic to add movie to a list in Firestore
  };

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={searchMovies}>
          Search
        </Button>
      </Container>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card>
              <CardContent>
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <Button
                  variant="contained"
                  onClick={() => addMovieToList(movie, "Your List Id")}
                >
                  Add to List
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Container sx={{marginTop:'50px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div>

        <h2>Your Lists</h2>
        </div>
        {lists.map((list) => (
          <div key={list.id}>
            <h3>{list.name}</h3>
            {/* Display movies in the list */}
          </div>
        ))}
      </Container>
    </Container>
  );
}

export default AddMovieToList;
