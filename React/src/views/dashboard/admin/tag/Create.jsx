import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { Loader } from '../../../../Layouts/components';
import axiosClient from "../../../../axios-client";



  export default function CreateTags() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
    const [selectedFiles,setSelectedFiles] = useState([])
    let {id}  = useParams();
    const [tag, setTag] =useState({
      id: null,
      name: '',
      description: ''
    })

if (id) {
     setLoading(true)
     getData(id)
}
    const handleImageChange = (e) => {
          setSelectedFiles((e.target.files[0]))
    }

function uploadToServer(e){
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('image',selectedFiles)
    formData.append('name', tag.name)
    formData.append('description', tag.description)
    sendData(formData)
}

    const sendData = async (data) => {
        try {
           const res = await axiosClient.post('/tags',data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
           })
           debugger
           setLoading(false)
           setNotification("Tag created successfully!")
           setTimeout(() => {
               navigate('/dashboard/admin/tags');
           }, 600)
        } catch (error) {
            setLoading(false)
            setErrors(error.errors)
        }
    }
const getData = async (id) => {
    try{
         const res = await axiosClient.get(`/tags/${id}`)
         setLoading(false)
         debugger
         setTag(res.data.data)
    } catch(error) {
        setLoading(false)
        setErrors(error.errors)
    }
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
              {tag.id ? ('Update Tag'):('Create a new Tag')}
            </Typography>
            <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
      onSubmit={(e) => uploadToServer(e)}
        style={{
          backgroundColor: "black",
          padding: "2rem",
          borderRadius: "10px",
          border: "2px solid purple",
        }}
      >
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <ul>
                <li key={key}> <p>{errors[key]} </p></li>
                </ul>
              ))}
            </div>
          }
          <br />

       <div>
        <label>Upload a Photo </label>
       </div>
        <input type="file"
        id="image"
        name="image"
        onChange = {handleImageChange}
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
        <div>
        <label>Name </label>
       </div>
        <input
        onChange={e  => setTag({...tag, name: e.target.value})}
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
          value={tag.name}
          placeholder="enter tag name"
        />
        <br />
        <br />
        <div>
        <label>Description</label>
       </div>
       <input
        onChange={e  => setTag({...tag, description: e.target.value})}
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
          value={tag.description}
          placeholder="enter tag name"
        />
        <br />
        <br />
        <button type="submit" className='btn'>
          Submit
        </button>
      </form>
    </div>

          </Box>
        </Container>
    );
  }
