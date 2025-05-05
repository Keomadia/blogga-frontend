import { Container } from '@mui/material';
import AuthForm from '../components/AuthForm';
// import GoogleLogin from '../components/GoogleLogin';
import DefaultLayout from '../layouts/default';
import { Box, Typography } from '@mui/material';


export default function Register() {
  return (
    <DefaultLayout>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20vh 0' }}>
            <AuthForm mode="register" />
            {/* <GoogleLogin /> */}

            <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography>Already have an account? <a href="/login">Login</a></Typography>
                {/* <p>Forgot your password? <a href="/forgot-password">Reset it</a></p> */}
              </Box>
        </Container>
    </DefaultLayout>
  );
}
