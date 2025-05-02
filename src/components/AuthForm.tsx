// src/components/PersonalAuthForm.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface Props {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const handleSubmit = async () => {
    try {
      if (mode === 'register') {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered:', user.user);
      } else {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in:', user.user);
      }
      navigate(from); 
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
          case 'auth/invalid-email':
            setError('Unknown user Register first.');
            break;
          case 'auth/invalid-credential':
            setError('Invalid credentials provided.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak.');
            break;
          case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          case 'auth/missing-password':
            setError('Input your Password.');
            break;
          default:
            setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('Could not complete request. Please try again.');
      }
      console.error(error.message);
    }
  };

  if (error === 'Unknown user Register first.') {
    let countdown = 4;
    const interval = setInterval(() => {
      setError(`Unknown user. Redirecting to register in ${countdown} seconds...`);
      countdown -= 1;
      if (countdown < 0) {
        clearInterval(interval);
        setError('');
        navigate('/register');
      }
    }, 1000);
  }

  return (
    <Box sx={{ width: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {mode === 'register' ? 'Register' : 'Login'} with Email
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        {mode === 'register' ? 'Register' : 'Login'}
      </Button>
    </Box>
  );
}
