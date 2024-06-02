import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { signUpUser } from '../api'; // Importing the signUp function from the api file
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUpUser(email, password); // Calling signUpUser function
      setDialogOpen(true); // Show the dialog when signup is successful
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
    navigate('/signin'); // Redirect to signin page after closing dialog
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Signup Successful</DialogTitle>
        <DialogContent>
          <Typography>Your account has been successfully created.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SignUp;
