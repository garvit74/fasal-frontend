import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getListdetails } from "../api"; // Import API functions

const defaultPoster =
  "https://www.reelviews.net/resources/img/default_poster.jpg";

const ListDetails = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedList = await getListdetails(listId, token);
        setList(fetchedList);
      } catch (error) {
        console.error("Failed to fetch list:", error);
      }
    };

    fetchData();
  }, [listId]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box py={2}>
        {" "}
        {/* Add padding to the top and bottom */}
        <Typography variant="h4">{list.name}</Typography>
      </Box>
      <Grid container spacing={3}>
        {list.movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <img
                  src={movie.poster !== "N/A" ? movie.poster : defaultPoster}
                  alt={`${movie.Title} Poster`}
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "cover",
                    objectPosition: "top", // Adjusts the position of the image within its container
                  }}
                />
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="subtitle1">{movie.year}</Typography>
                <Button
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  variant="contained"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListDetails;
