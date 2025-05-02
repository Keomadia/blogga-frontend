import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setAuthenticated(!!user);
            setLoading(false);
            if (!user) {
                setTimeout(() => {
                 handleOpen();
                }
                , 1200);
                navigate('/login', { state: { from: location.pathname } });
                
            }
        });

        return () => unsubscribe();
    }, [navigate, location]);

    if (loading) return <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open} onClick={handleClose}><CircularProgress color="inherit" /></Backdrop>;

    return <>{authenticated && children}</>;
}
