import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Newsletter from '../components/Newsletter';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


import { useNavigate } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/"> Blogga</Link>&nbsp;{new Date().getFullYear()}
    </Typography>
  );
}


export default function Footer() {
    const navigate = useNavigate();

     const [user, setUser] = React.useState<User | null>(null);
    React.useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, []);
  return (
    <React.Fragment>
      <Divider />
      <Container sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',gap: { xs: 4, sm: 8 },py: { xs: 8, sm: 10 },textAlign: { sm: 'center', md: 'left' },}}>
        <Box sx={{display: 'flex',flexDirection: { xs: 'column', sm: 'row' },width: '100%',justifyContent: 'space-between',}}>
          <Box sx={{display: 'flex',flexDirection: 'column',gap: 4,minWidth: { xs: '100%', sm: '60%' },}}>
            <Newsletter />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              QuickLinks
            </Typography>
            <Link color="text.secondary" variant="body2" href="/">
              Home
            </Link>
            <Link color="text.secondary" variant="body2" href="/blog">
              Blog
            </Link>
            <Link color="text.secondary" variant="body2" href="/about">
              About
            </Link>         
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            
             { !user && (
              <>
                <Button variant="contained" onClick={() => navigate('/register')} fullWidth>
                  Sign up
                </Button>
                <Button variant="contained" onClick={() => navigate('/login')} fullWidth>
                  Login
                </Button>
              </>)
             }
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: 'left', color: 'text.secondary' }}>
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/keomadia"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <GitHubIcon />
            </IconButton>
            
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/keomadi-anyankah-1723a5306/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
