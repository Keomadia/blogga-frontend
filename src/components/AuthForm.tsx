// src/components/PersonalAuthForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert,Checkbox,FormControlLabel,FormControl,InputLabel,InputAdornment,OutlinedInput,IconButton, Box, Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';
    function customEncrypt(password: string): string {
      const result: string[] = [];
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/[]{}|';
      let passIndex = 0;
      const totalLength = password.length * 5;
    
      for (let i = 0; i < totalLength; i++) {
        if (i % 5 === 0) {
          result.push(password[passIndex++]);
        } else {
          const randChar = chars[Math.floor(Math.random() * chars.length)];
          result.push(randChar);
        }
      }
    
      return result.join('');
    }

    function customDecrypt(encrypted: string): string {
      let result = '';
      for (let i = 0; i < encrypted.length; i++) {
        if (i % 5 === 0) {
          result += encrypted[i];
        }
      }
      return result;
    }
    
  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }   
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
 




    function saveUserToLocalStorage(email: string , password: string) {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', customEncrypt(password));
    }

    function removeUserFromLocalStorage() {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
    }

      

    try {
      if (mode === 'register') {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered:', user.user['email']);
      } else {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in:', user.user['email']);
      }
      if (rememberMe) {
        saveUserToLocalStorage(email, password);
      }
      else {
        removeUserFromLocalStorage();
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
  }


  if (mode === "login" && error === 'Unknown user Register first.') {
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

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    if (storedEmail && storedPassword && mode === 'login') {
      setEmail(storedEmail);
      setPassword(customDecrypt(storedPassword));
      setRememberMe(true);
    }
  }
  , []);

    
   return (
    <Box
    sx={{
      width: '90%',
      maxWidth: 400,
      mx: 'auto',
      mt: 4,
      px: { xs: 2, sm: 3 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography variant="h6" gutterBottom textAlign="center">
      {mode === 'register' ? 'Register' : 'Login'} with Email
    </Typography>
  
    {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
  
    <TextField
      fullWidth
      label="Email"
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  
    <FormControlLabel
      control={
        <Checkbox
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
      }
      label="Remember Me"
      sx={{ alignSelf: 'flex-start', mt: 1 }}
    />
  
    <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
      {mode === 'register' ? 'Register' : 'Login'}
    </Button>
  </Box>
  
  );
}
