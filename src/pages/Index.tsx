import DefaultLayout from "../layouts/default";
import Container from '@mui/material/Container'
import MainContent from '../components/MainContent';
import Latest from '../components/Latest';
import { useEffect, useState } from "react";
import { NewsletterPopup } from '../components/Newsletter';

export default function Index() {
    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const triggerPoint = document.body.scrollHeight * 0.6;
          if (scrollPosition >= triggerPoint) {
            setShowNewsletterPopup(true);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

    return (
        <DefaultLayout>
            {showNewsletterPopup && <NewsletterPopup />}
            <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 2  }}>
                <MainContent />
                <Latest />
            </Container>
        </DefaultLayout>
    );
    }