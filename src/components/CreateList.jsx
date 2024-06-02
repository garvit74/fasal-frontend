// CreateList.js
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createList, getallLists, deleteList } from '../api'; // Import the function

function CreateList() {
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

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

  const handleCreateList = async () => {
    const newListData = {
      name: listName,
      movies: [], // Start with an empty movie list
      isPublic
    };

    try {
      const newList = await createList(newListData, token);
      setLists([...lists, newList]); // Add the newly created list to the local state
      setListName("");
      setIsPublic(false);
    } catch (error) {
      console.error("Failed to create list:", error);
      alert("Failed to create list");
    }
  };
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

  const privateLists = lists.filter((list) => !list.isPublic);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>Create New List</h2>
      <Container sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <TextField
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleCreateList}>
          Create List
        </Button>
      </Container>
      <FormControlLabel
        control={
          <Switch
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        }
        label="Public"
      />

      <h2>Your Lists</h2>
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
    </Container>
  );
}

export default CreateList;
