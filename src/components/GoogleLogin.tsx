import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate, useLocation, } from 'react-router-dom';
import { useEffect } from 'react';

export default function GoogleLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const handleGoogleLogin = async () => {
    try {
      if (window.innerWidth < 768) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google Login:', result.user);
        navigate(from);
      }
    } catch (error: any) {
      console.error('Google Login Failed:', error.message);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('Redirect login success:', result.user);
          navigate(from);
        }
      })
      .catch((error) => {
        if (error) console.error('Redirect login failed:', error.message);
      });
  }, []);

  return (
    <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin} sx={{ mt: 2 }}>
      Sign in with Google
    </Button>
  );
}
