import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



  export default function CreatePosts() {
  

    return (
        <Container component="main" maxWidth="100%">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Create a new tag
            </Typography>
            
          </Box>
        </Container>
    );
  }
