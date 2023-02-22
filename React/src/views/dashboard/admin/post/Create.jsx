import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



  export default function CreatePosts() {
  let {id}  = useParams()

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
              {id ? ('Update Post'):('Create a new Post')}
            </Typography>
            <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >


    <form
      onSubmit={() => {}}
        style={{
          backgroundColor: "black",
          padding: "2rem",
          borderRadius: "10px",
          border: "2px solid purple",
        }}
      >

        <button type="submit" className='btn'>
          Submit
        </button>
      </form>
    </div>

          </Box>
        </Container>
    );
  }
