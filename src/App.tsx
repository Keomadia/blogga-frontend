import './App.css'
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useState, useEffect } from "react";
import { ArrowUpwardRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';


function App() {
  const [showButton, setShowButton] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  return (
    <>
      <Routes>
        <Route element={<Index />} path="/" />
        <Route element={<Blog />} path="/blog" />
        <Route element={<About />} path="/about" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <BlogDetail />
            </ProtectedRoute>
          }
        />
      </Routes> 

      {showButton && (
         <IconButton onClick={scrollToTop} sx={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}>
            <ArrowUpwardRounded />
         </IconButton>
           
         )}
 
    </>
)}

export default App;
