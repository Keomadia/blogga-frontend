// src/pages/Login.tsx
import { Container } from '@mui/material';
import AuthForm from '../components/AuthForm';
import GoogleLogin from '../components/GoogleLogin';
import DefaultLayout from '../layouts/default';

export default function Login() {
  return (
    <DefaultLayout>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20vh 0' }}>
        <AuthForm mode="login" />
        <GoogleLogin />
      </Container>
    </DefaultLayout>
  );
}
