import { Box, Typography, LinearProgress } from '@mui/material';
import LogoText from './LogoText';

export const Loader = () => {
     return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: 1000 }}>
            <Typography variant="h4">
              <LogoText varian='h2'></LogoText>
              <LinearProgress />
              </Typography>
          </Box>
        );
}