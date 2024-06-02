import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const YOUR_OMDB_API_KEY = process.env.REACT_APP_API_KEY;

const defaultPoster =
  "https://www.reelviews.net/resources/img/default_poster.jpg";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [publicLists, setPublicLists] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const user = []; // Fetch details of the user that has signed in

  useEffect(() => {
    // Here you might want to fetch user details and public lists
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${YOUR_OMDB_API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();

      if (data.Error) throw new Error(data.Error);
      setSearchResults(data.Search || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && <Typography color="error">{error}</Typography>}
      {user ? (
        <>
          <h2>Search Movies</h2>
          <Container sx={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Search Movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Container>
          <Grid container spacing={3}>
            {searchResults.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <Card sx={{ height: "100%" }}>
                  {" "}
                  {/* Set fixed height or maxHeight if preferred */}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                   <img
                      src={movie.Poster !== "N/A" ? movie.Poster : defaultPoster}
                      alt={`${movie.Title} Poster`}
                      style={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover",
                        objectPosition: "top", // Adjusts the position of the image within its container
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {movie.Title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {movie.Year}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/movie/${movie.imdbID}`}
                      variant="contained"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <h2>Public Movie Lists</h2>
          <Grid container spacing={3}>
            {publicLists.map((list) => (
              <Grid item xs={12} sm={6} md={4} key={list.id}>
                <Card sx={{ height: "100%" }}>
                  {" "}
                  {/* Set fixed height */}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {list.name}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/list/${list.id}`}
                      variant="contained"
                    >
                      View List
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Search;
