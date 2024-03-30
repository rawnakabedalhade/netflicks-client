import * as React from "react";
import { CssBaseline, Box, Container, Grid, Typography } from "@mui/material";
import "../styles/aboutus.css";

const AboutUs = () => {
  return (
    <Box>
      <CssBaseline />
      <Container className="about-us-container">
        <h1 className="contact-us-title">About Us</h1>
      </Container>
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={12} md={6} sx={{ padding: 2, mt: 2 }}>
          <Box
            sx={{
              bgcolor: "#333333",
              color: "primary.contrastText",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Welcom to our NetFlicks!
            <Typography color="white">
              Netflicks stands at the forefront of digital entertainment,
              offering a comprehensive platform where users can access an
              extensive library of movies from various genres and eras. With a
              user-friendly interface and intuitive navigation, Netflicks
              ensures that every user can easily discover and enjoy their
              favorite films. Our platform caters not only to individual movie
              enthusiasts but also to businesses looking to showcase their
              cinematic creations. Through Netflicks, business users and
              administrators have the flexibility to create, edit, and delete
              movie listings, empowering them to curate compelling collections
              that resonate with their target audience. At Netflicks, we
              prioritize user satisfaction and strive to provide an immersive
              movie-watching experience. From blockbuster hits to indie gems,
              our diverse catalog caters to every taste and preference, ensuring
              that there's something for everyone to enjoy. The regular user
              experience on Netflicks is designed to be seamless and enjoyable,
              offering a vast array of movies across genres and eras.We
              understand the importance of accessibility, which is why Netflicks
              is designed to be compatible with a wide range of devices and
              screen sizes. Whether you're streaming on your laptop, tablet, or
              smartphone, you can enjoy a seamless viewing experience without
              compromise. Behind the scenes, our dedicated team works tirelessly
              to ensure that Netflicks remains a cutting-edge platform that
              delivers on its promises.Netflicks is more than just a streaming
              service—it's a cultural phenomenon that has revolutionized the way
              we consume and interact with movies. With millions of satisfied
              users worldwide, we continue to set the standard for excellence in
              digital entertainment. As we look to the future, Netflicks remains
              committed to pushing boundaries and exploring new frontiers in the
              world of online cinema. We invite you to join us on this journey
              as we continue to redefine what it means to be a movie lover in
              the digital age.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ padding: 2, mt: 2 }}>
          <Box
            sx={{
              bgcolor: "#333333",
              color: "primary.contrastText",
              p: 2,
              height: "100vh",
              display: "flex",
              alignItems: "center",
            }}
            className="about-us-img"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutUs;
