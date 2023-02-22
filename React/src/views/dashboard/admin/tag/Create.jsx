import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../../../contexts/ContextProvider';
import axiosClient from "../../../../axios-client";



  export default function CreateTags(prop) {
    const  navigate = useNavigate()
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
    const [selectedFiles,setSelectedFiles] = useState([])
    let {id}  = useParams();
    const [tag, setTag] =useState({
      id: null,
      name: '',
      image:'',
      description: ''
    })

useEffect(() => {
        if (id && prop.value === 'update' ) {
           getTags(id)
        }
},[])

    const getTags = async (id) => {
        try {
            const res = await axiosClient.get(`/tags/${id}`)
            setLoading(false)
             setTag(res.data.data)
        } catch (error) {
         setLoading(false)
         setErrors(error.errors)
        }
     }



    const handleImageChange = (e) => {
          setSelectedFiles((e.target.files[0]))
    }

function uploadToServer(e){
    e.preventDefault();
    if (tag.id) {
        setLoading(true);
          axiosClient.put(`/tags/${tag.id}`, {
            name:tag.name,
            description: tag.description
          }).then((res) => {
            setNotification(
                "Tag updated successfully!"
                );
                setLoading(false);
                 setInterval(() => {
                    navigate('/dashboard/admin/tags')
                 }, 3000);
          }).catch((error) => {
            setLoading(false)
            setErrors(error.errors)
          })
    } else {
    const formData = new FormData();
    formData.append('image',selectedFiles)
    formData.append('name', tag.name)
    formData.append('description', tag.description)
    setLoading(true);
    sendData(formData)
   }
}

    const sendData = async (data) => {
        try {
           const res = await axiosClient.post('/tags',data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
           })
           setNotification(
            "Tag created successfully!"
            );
            setLoading(false);
             setInterval(() => {
                navigate('/dashboard/admin/tags')
             }, 4000);
        } catch (error) {
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
            {loading && (
          <div colSpan="10" className="text-center">
           <p> Loading...</p>
          </div>
        )}
            <Typography component="h1" variant="h5">
              {id ? ('Update Tag'):('Create a new Tag')}
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
                <li key={key}> <p style={{color:"red"}}>{errors[key]} </p></li>
                </ul>
              ))}
            </div>
          }
          <br />
       {id ? (''):(   <div>
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
        <br /> </div>)}

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
          value={tag.description ? tag.description : ''}
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
