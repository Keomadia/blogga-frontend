import { Box, Typography, Button, Link } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Box sx={{ minHeight: '100vh',bgcolor: '#121212',color: 'white',display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',textAlign: 'center',p: 4,}}>
      <ErrorOutlineIcon sx={{ fontSize: 100, mb: 2, color: '#00bcd4' }} />

      <Typography variant="h4" gutterBottom>Page not found</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>You might not have permissions to see this page.</Typography>

      <Button variant="contained" color="primary" component={Link} href="/" sx={{ mr: 2 }} >Back to home </Button>
      <Button variant="outlined" color="secondary" component={Link} href="/login" sx={{ mt: 2 }} > Log in with a different user →</Button>
    </Box>
  );
};

export default NotFound;
