import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/SignIn";
import AddMovieToList from "./components/AddMovieToList";
import CreateList from "./components/CreateList";
import ListDetails from "./components/ListDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create-list" element={<CreateList />} />
          <Route path="/list/:listId" element={<ListDetails />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/addMovies/:listId" element={<AddMovieToList />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
