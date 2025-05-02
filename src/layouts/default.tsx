import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Footer from '../components/Footer'
import { Loader } from '../components/Loader';
import { useEffect, useState } from "react";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 8, gap: 4}}>
      <Navbar />
      <main >
        {children}
      </main>

      <Footer/>
    </Container>
  );
}
