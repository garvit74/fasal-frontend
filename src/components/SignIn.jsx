import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { signInUser } from '../api';  // Importing the signIn function from the api file

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await signInUser(email, password);
      console.log('Signed In Successfully:', response);
      // Redirect or show success message based on response
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card sx={{ width: 300, padding: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Sign In
          </Typography>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
          <Typography variant="body2" style={{ marginTop: '1em' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignIn;
