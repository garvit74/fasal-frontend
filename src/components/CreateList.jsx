import React, { useState } from "react";
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
import AddMovieToList from "./AddMovieToList";
// import { auth, db } from '../firebase';
// import { collection, addDoc } from "firebase/firestore";

function CreateList() {
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [lists, setLists] = useState([]);
  const Navigate = useNavigate();

  const handleCreateList = async () => {
    const newList = {
      id: Date.now(),
      name: listName,
      public: isPublic,
      movies: [],
    };

    setLists([...lists, newList]);
    setListName("");
    setIsPublic(false);

    // Uncomment and modify the following lines if you want to save to Firestore
    // if (!auth.currentUser) {
    //   console.error("No user is logged in");
    //   return;
    // }

    // const userDocRef = collection(db, "users", auth.currentUser.uid, "lists");
    // await addDoc(userDocRef, {
    //   name: listName,
    //   movies: [],
    //   public: isPublic
    // });
  };

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
        {lists.map((list) => (
          <Grid item xs={12} sm={6} md={4} key={list.id}>
            <Card>
              <CardContent>
                <h3>{list.name}</h3>
                <p>{list.public ? "Public" : "Private"}</p>
                <Button
                  variant="contained"
                  onClick={() => Navigate("/addMovies/:listId")}
                >
                  Add Movies
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <AddMovieToList/> */}
    </Container>
  );
}

export default CreateList;
