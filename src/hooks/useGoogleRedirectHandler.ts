import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export function useGoogleRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('Redirect Login:', result.user);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Redirect error:', error.message);
      });
  }, [navigate]);
}
