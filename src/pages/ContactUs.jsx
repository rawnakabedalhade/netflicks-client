import * as React from "react";
import { CssBaseline, Box, Container, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import "../styles/contact.css";

const ContactUs = () => {
  return (
    <Box>
      <CssBaseline />
      <Container className="contact-us-container">
        <h1 className="contact-us-title">Contact Us</h1>
      </Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={4} md={4} sx={{ padding: 2, mt: 5 }}>
            <Box
              sx={{
                bgcolor: "#564d4d",
                color: "primary.contrastText",
                p: 2,
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "5px solid #000000",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#000000",
                  width: 55,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: 40,
                    color: "#db0000",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Typography variant="h5" color="white">
                Email Us
              </Typography>
              <Typography
                color="white"
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                For inquiries, assistance, or feedback, feel free to reach out
                to us via email at NetFlicks@email.com. We're here to help!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ padding: 2, mt: 5 }}>
            <Box
              sx={{
                bgcolor: "#564d4d",
                color: "primary.contrastText",
                p: 2,
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "5px solid #000000",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#000000",
                  width: 55,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CallIcon
                  sx={{
                    fontSize: 40,
                    color: "#db0000",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Typography variant="h5" color="white">
                Call Us
              </Typography>
              <Typography
                color="white"
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                Have questions or need immediate assistance? Give us a call at
                +1234567890. Our dedicated team is ready to assist you.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ padding: 2, mt: 5 }}>
            <Box
              sx={{
                bgcolor: "#564d4d",
                color: "primary.contrastText",
                p: 2,
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "5px solid #000000",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#000000",
                  width: 55,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: 40,
                    color: "#db0000",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Typography variant="h5" color="white">
                Location
              </Typography>
              <Typography
                color="white"
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                Visit us at our convenient location: 123 Main Street, Cityville,
                State, ZIP. We look forward to welcoming you!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ContactUs;
