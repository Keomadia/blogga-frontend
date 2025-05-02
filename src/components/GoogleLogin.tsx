// src/components/GoogleLogin.tsx
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GoogleLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Login:', result.user);
      navigate(from);
    } catch (error: any) {
      console.error('Google Login Failed:', error.message);
    }
  };

  return (
    <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin} sx={{ mt: 2 }}>
      Sign in with Google
    </Button>
  );
}
