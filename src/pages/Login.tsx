// src/pages/Login.tsx
import { Container,Box, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm';
// import GoogleLogin from '../components/GoogleLogin';
import DefaultLayout from '../layouts/default';

export default function Login() {
  return (
    <DefaultLayout>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20vh 0' }}>
        <AuthForm mode="login" />
        {/* <GoogleLogin /> */}
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography>Don't have an account? <a href="/register">Register</a></Typography>
          {/* <p>Forgot your password? <a href="/forgot-password">Reset it</a></p> */}
        </Box>
      </Container>
    </DefaultLayout>
  );
}
