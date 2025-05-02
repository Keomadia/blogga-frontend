import DefaultLayout from "../layouts/default";
import Container from '@mui/material/Container'
import MainContent from '../components/MainContent';
import Latest from '../components/Latest';

export default function Index() {
  return (
        <DefaultLayout>
            <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 2  }}>
                <MainContent />
                <Latest />
            </Container>
        </DefaultLayout>
    );
    }