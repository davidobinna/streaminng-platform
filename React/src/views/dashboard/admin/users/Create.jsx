import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { Loader } from '../../../../Layouts/components';



  export default function CreateUsers() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  let {id}  = useParams();
  const [user, setUser] =useState({
    id: null,
  })

if(id){
    setLoading(true)
}

const onSubmit = e => {

}

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
                {loading && <div colSpan="10" className="text-center">
                   <Loader />
                </div> }
            <Typography component="h1" variant="h5">
              {id ? ('Update a new User'):('Create a new User')}
            </Typography>
            <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          backgroundColor: "black",
          padding: "2rem",
          borderRadius: "10px",
          border: "2px solid purple",
        }}
      >
        <input
          type="text"
          style={{
            width: "800px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
        />
        <br />
        <br />
        <input type="file"
        style={{
            width: "800px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}/>
        <br />
        <br />
        <button type="submit" style={{ padding: "1rem", backgroundColor: "purple", color: "white" }}>
          Submit
        </button>
      </form>
    </div>

          </Box>
        </Container>
    );
  }
