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
        <Grid item xs={12} sm={4} md={6} sx={{ padding: 2, mt: 2 }}>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              maxime quaerat natus voluptate doloribus eaque, possimus
              laudantium exercitationem placeat, illum, eius itaque. Expedita
              accusamus ducimus, nesciunt dolores nemo ipsa iste. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Nobis, illum?
              Quibusdam minima iusto voluptate veniam nulla accusantium sunt qui
              at nihil. Ut, facilis! Eos laborum ullam dignissimos, assumenda
              ratione maiores. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Corporis optio consequatur facere iste
              architecto eius error reprehenderit possimus. Animi, aspernatur?
              Dolorem ut eos asperiores exercitationem suscipit quae praesentium
              saepe illo! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Facilis aperiam voluptatem libero debitis, soluta ratione
              aliquid incidunt perspiciatis! Blanditiis, aut voluptas quaerat
              beatae laborum recusandae. Saepe aperiam ratione sapiente nemo!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={6} sx={{ padding: 2, mt: 2 }}>
          <Box
            sx={{
              bgcolor: "#333333",
              color: "primary.contrastText",
              p: 2,
              height: "380px",
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
