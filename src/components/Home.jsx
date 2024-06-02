import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { getallLists, deleteList } from "../api"; // Adjust the path and import deleteList function as needed
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [lists, setLists] = useState([]); // State to store the list data
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    const fetchLists = async () => {
      if (!token) {
        return;
      }

      try {
        const lists = await getallLists(token); // Assuming 'all' can be used to fetch all lists
        setLists(lists); // Set the lists in state
      } catch (error) {
        console.error("Error fetching lists:", error.response || error.message);
      }
    };

    fetchLists();
  }, []); // Dependency array is empty, so this runs only once when the component mounts
  
  const handleViewDetails = (listId) => {
    navigate(`/list/${listId}`);
  };


  const handleDeleteList = async (listId) => {
    try {
      // Call the deleteList API function passing the listId
      await deleteList(listId, token);
      // Remove the deleted list from the state
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error("Error deleting list:", error.response || error.message);
    }
  };

  // Filter lists into public and private
  const publicLists = lists.filter((list) => list.isPublic);
  const privateLists = lists.filter((list) => !list.isPublic);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Lists
      </Typography>
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Public Lists
        </Typography>
        <Grid container spacing={3}>
          {publicLists?.map((list) => (
            <Grid item xs={12} sm={6} md={4} key={list._id}>
              <Card onClick={()=>handleViewDetails(list._id)}>
                <CardContent>
                  <h3>{list.name}</h3>
                  <p>{list.isPublic ? "Public" : "Private"}</p>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/addMovies/${list._id}`)}
                    sx={{ marginRight: 1 }} // Adding margin to the right to create space
                  >
                    Add Movies
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteList(list._id)}
                    sx={{ marginLeft: 1 }} // Adding margin to the left to create space
                  >
                    Delete List
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Private Lists
        </Typography>
        <Grid container spacing={3}>
          {privateLists?.map((list) => (
            <Grid item xs={12} sm={6} md={4} key={list._id}>
              <Card onClick={()=>handleViewDetails(list._id)}>
                <CardContent>
                  <h3>{list.name}</h3>
                  <p>{list.isPublic ? "Public" : "Private"}</p>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/addMovies/${list._id}`)}
                    sx={{ marginRight: 1 }} // Adding margin to the right to create space
                  >
                    Add Movies
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteList(list._id)}
                    sx={{ marginLeft: 1 }} // Adding margin to the left to create space
                  >
                    Delete List
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
