import CssBaseline from '@mui/material/CssBaseline';
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axiosClient from '../../../../axios-client';
import { useStateContext } from '../../../../contexts/ContextProvider';



  export default function CreatePosts() {
  let {id}  = useParams()
  const [tags,setTags] = useState({})
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectImage,setSelectImage] = useState('')
  const {setNotification}  = useStateContext();
  const [isCommentable, setIsCommentable] = useState(true);
  const [post, setPost] = useState({
    id: null,
    title: '',
    body: '',
    tags: [],
    type: '',
    cover_image: '',
    published_at: '',
    is_commentable: false,
    photo_credit_text: '',
    photo_credit_link: '',
  })



  useEffect(() => {
     axiosClient.get('/taglist')
     .then((res) =>{
        setTags(res.data.data);
     }).catch((error)=> {
        setNotification(error);
     });
     setPost({...post, tags: selectedTags})
  }, [selectedTags])


  function toggleCommentable() {
    setIsCommentable(!isCommentable);
    setPost({...post, is_commentable: isCommentable})
  }

  function selectTags() {
    const options = event.target.selectedOptions;
    const values = Array.from(options).map((option) => option.value);
    setSelectedTags(values);
 }


  const handleImage = (e) => {
    setSelectImage((e.target.files[0]))
  }

  const uploadToServer = (e) =>
  {
       e.preventDefault();
       if(post.id){

       } else {
       console.log(post)
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

            <Typography component="h1" variant="h5">
              {id ? ('Update scene'):('Create a new scene')}
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


       <div>
        <label>Cover Image</label>
       </div>
       <input
       onChange={handleImage}
          type="file"
          id="image"
          name="image"
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

        <div>
        <label>Title</label>
       </div>
       <input
       onChange = {(e) => setPost({...post, title: e.target.value })}
          type="text"
          id="title"
          name="title"
          style={{
            width: "800px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
          placeholder="Give This Scene A Title!"
          value= { post.title ? post.title : null }
        />
        <br />
        <br />

        <div>
        <label>Content</label>
       </div>
       <input
       onChange = {(e) => setPost({...post, body: e.target.value })}
          type="text"
          id="body"
          name="body"
          style={{
            width: "800px",
            height: "150px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
          placeholder="What Is On Your Mind?"
          value= { post.body ? post.body : null }
        />
        <br />
        <br />

        <div>
        <label>Date Published</label>
       </div>
       <input
       onChange = {(e) => setPost({...post, published_at: e.target.value })}
          type="date"
          id="published_at"
          name="published_at"
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

        <div>
        <label>Visibilty Type</label>
        <p style={{
            color: "grey",
          }}>(only subscribers can see premium scene)</p>
       </div>
         <select style={{
            width: "200px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }} name="type" id="type"
          onChange = {(e) => setPost({...post, type: e.target.value })}
          >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
         </select>
        <br />
        <br />

        <div>
        <label>Tags (multiple selection)</label>
       </div>

         <select
        onChange = {selectTags}
         style={{
            width: "200px",
            height: "100px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }} id="tagsSelection" multiple x-data="{}" placeholder='--select tags--' >
              { tags ? ( Object.keys(tags).map(item => (
                <option key={item.toString()} value={tags[item].id}>{tags[item].name}</option>
             )))
             :(<option value="0">No tags</option>)}
         </select>
        <br />
        <br />

        <div>
        <label>Photo Credit Name</label>
       </div>
       <input
          onChange = {(e) => setPost({...post, photo_credit_text : e.target.value })}
          type="text"
          id="photo_credit_text"
          name="photo_credit_text"
          style={{
            width: "800px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
          value={ post.photo_credit_text ? post.photo_credit_text : null }
          placeholder="photo credit name (optional)"
        />
        <br />
        <br />

        <div>
        <label>Photo Credit Link</label>
       </div>
       <input
          onChange = {(e) => setPost({...post, photo_credit_link : e.target.value })}
          type="text"
          id="photo_credit_link"
          name="photo_credit_link"
          style={{
            width: "800px",
            height: "50px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
          value = {post.photo_credit_link ? post.photo_credit_link : null }
          placeholder="photo credit social link (optional)"
        />
        <br />
        <br />

        <div>
        <label>Disable Comments</label>
       </div>
       <input
          onChange = {toggleCommentable}
          type="checkbox"
          id="is_commentable"
          name="is_commentable"
          style={{
            position: "relative",
            width: "40px",
            height: "40px",
            outline: "none",
            border: "2px solid black",
            borderRadius: "5px",
            backgroundColor: "white",
            transition: "background-color 0.2s ease",
          }}
          checked={isCommentable}
        />
        <p> {isCommentable ? ('Comments are turned OFF'):('Comments are turned ON') } </p>
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
