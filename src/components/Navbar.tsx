import { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Drawer,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoIcon from './BloggaIcon';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderColor: theme.palette.divider,
  border: '1px solid',
  padding: '8px 12px',
}));

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch((error: Error) => {
        console.error("Logout Error: ", error.message);
      });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 10px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <LogoIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {siteConfig.navItems.map((item: { label: string; href: string }) => (
                <Button
                  key={item.href}
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate(item.href)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {!user ? (
              siteConfig.navItemsSec.map((item: { label: string; href: string }) => (
                <Button
                  key={item.href}
                  variant={item.href === '/login' ? 'text' : 'contained'}
                  color="info"
                  size="small"
                  onClick={() => navigate(item.href)}
                >
                  {item.label}
                </Button>
              ))
            ) : (
              <Button variant="contained" color="info" size="small" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {siteConfig.navItems.map((item: { label: string; href: string }) => (
                  <MenuItem key={item.href}>
                    <Button onClick={() => navigate(item.href)}>{item.label}</Button>
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                {!user ? (
                  siteConfig.navItemsSec.map((item: { label: string; href: string }) => (
                    <MenuItem key={item.href}>
                      <Button
                        variant={item.href === '/login' ? 'outlined' : 'contained'}
                        color="info"
                        size="small"
                        onClick={() => navigate(item.href)}
                        fullWidth
                      >
                        {item.label}
                      </Button>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={handleLogout}
                      fullWidth
                    >
                      Logout
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
