import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { signUpUser } from '../api';  // Importing the signUp function from the api file

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signUpUser(email, password);
      console.log('Success:', response);
      // Redirect or show success message based on response
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card sx={{ width: 300, padding: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Sign Up
          </Typography>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignUp;
