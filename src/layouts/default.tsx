import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Footer from '../components/Footer'


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
