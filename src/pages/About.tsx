import React from 'react';
import { Container } from '@mui/material';
import DefaultLayout from '../layouts/default';
import { Box, Typography, IconButton } from "@mui/material";
import {  FaTwitter, FaLinkedinIn, FaYoutube, FaDiscord , FaGithub } from "react-icons/fa";
import LogoText from '../components/LogoText';
import { siteConfig } from '../config/site';

const About: React.FC = () => {
  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 0, lg: 4 } }} >
        <Box sx={{ display: "flex",flexDirection: { xs: "column", md: "row" },alignItems: "center",justifyContent: "center",padding: 4,backgroundColor: "white",boxShadow: 3,borderRadius: 2,gap: { xs: 2, md: 4 },}}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Box component="img" src="https://picsum.photos/800/800?random=2" alt="Your Profile" sx={{width: { xs: "200px", sm: "250px", md: "300px" },height: { xs: "200px", sm: "250px", md: "300px" },objectFit: "cover",objectPosition: "top",borderRadius: "50%",border: "2px solid #ececec",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.418)",}}/>
            {/* <Box component="img" src="https://media.licdn.com/dms/image/v2/D5603AQGK-BVGPtDlVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714210938589?e=1751500800&v=beta&t=dJSHJL6uHh7VRcZUIOIHp7BteYj0btrbTWOk-DMlTKM" alt="Your Profile" sx={{width: { xs: "200px", sm: "250px", md: "300px" },height: { xs: "200px", sm: "250px", md: "300px" },objectFit: "cover",objectPosition: "top",borderRadius: "50%",border: "2px solid #ececec",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.418)",}}/> */}
          </Box>

          <Box sx={{ flex: 1, maxWidth: "500px", padding: { xs: 1, md: 2 } }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: "#222", mb: 2, fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              <LogoText varian='h2' />
            </Typography>

            <Typography variant="body1" sx={{ color: "#555", textAlign: "justify", mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              A little corner of the web built by Keoma for thoughts, tech takes, and a whole lot of personality.
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", textAlign: "justify", mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              Keoma is an <strong>Aspiring Software engineer</strong>, and a proud member of the
              "I’m gonna be a billionaire one day" club. BloggA is his digital journal — sprinkled with code, creativity, and random brilliance.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', textAlign: 'justify', mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              He’s what you’d call an <strong>FFF</strong> — Funny, Fit, and soon to be your Favorite (not Friend for Food, sorry 😂).
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', textAlign: 'justify', mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              Whether you're into tech rants, startup vibes, or lifestyle inspiration, this blog’s got a bit of everything.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
              {Object.entries(siteConfig.links).map(([key, value]) => (
              <Box key={key} sx={{ position: "relative", display: "inline-block" }}>
                <IconButton onClick={() => window.open(value, "_blank")} color="inherit">
                {key === "github" && <FaGithub />}
                {key === "twitter" && <FaTwitter />}
                {key === "youtube" && <FaYoutube />}
                {key === "linkedin" && <FaLinkedinIn />}
                {key === "discord" && <FaDiscord />}
                </IconButton>
              </Box>
              ))}
            </Box>
            <style>
              {`
              .hover-label:hover {
                opacity: 1;
              }
              `}
            </style>
          </Box>
        </Box>


      </Container>
    </DefaultLayout>
  );
};

export default About;
