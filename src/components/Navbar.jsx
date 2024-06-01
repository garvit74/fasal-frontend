import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true); // Or set to a user object if more info is needed
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');  // Remove the token from local storage on logout
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Movie Library
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {user && <Button color="inherit" component={Link} to="/create-list">Create List</Button>}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
