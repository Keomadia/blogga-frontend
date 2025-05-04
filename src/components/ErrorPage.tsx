import { Box, Typography, Button, Container } from '@mui/material';
import { Redo } from '@mui/icons-material';


export const ErrorPage = () => {
    return (
        <Container sx={{ minHeight: '100vh', padding: 2 , alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="center"  textAlign="center"  onClick={() => window.location.reload()} sx={{ cursor: 'pointer', mb: 3 , borderRadius: 2, padding: 5, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                <Redo color="error" sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" color="error" gutterBottom>
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    We couldn’t load the blog post. Please try again later.
                </Typography>
            </Box>    
            <Button variant="outlined" color="primary" onClick={() => (window.location.href = '/')} sx={{ mt: 2 , color: '#000000'}}>
                    Back to Home
                </Button>
        </Container>
    );
};
