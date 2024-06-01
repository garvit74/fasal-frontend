import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/SignIn';
import AddMovieToList from './components/AddMovieToList';
import CreateList from './components/CreateList';
import ListDetails from './components/ListDetails';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/create-list" element={<CreateList/>} />
        <Route path="/list/:listId" element={<ListDetails/>} />
        <Route path="/movie/:movieId" element={<MovieDetails/>} />
        <Route path="/addMovies/:listId" element={<AddMovieToList/>} />
      </Routes>
    </Router>
  );
}

export default App;
