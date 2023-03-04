import CssBaseline from '@mui/material/CssBaseline';
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Loader } from "../../../../Layouts/components";
import axiosClient from '../../../../axios-client';
import { useStateContext } from '../../../../contexts/ContextProvider';



  export default function CreatePosts(prop) {
  let {id}  = useParams()
  const navigate = useNavigate()
  const [sel, setSel]  = useState("standard")
  const [tags,setTags] = useState({})
  const [errors, setErrors] = useState(null)
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectImage,setSelectImage] = useState('')
  const {setNotification}  = useStateContext();
  const [isCommentable, setIsCommentable] = useState(true);
  const [post, setPost] = useState({
    id: null,
    title: '',
    body: '',
    tags: 'none',
    tag_name: [],
    type: 'standard',
    cover_image: '',
    published_at: '',
    comments: true,
    photo_credit_text: '',
    photo_credit_link: '',
  })

//NOTE1 : Fix the Delete Tgas button by creating a delete tag relationship from backend and clear the array tags from frontend
  useEffect(() => {
    if (id && prop.value != 'create') {
          axiosClient.get(`/posts/${id}`)
          .then((res) => {
          setPost({...post,
             id: res.data.id,
             title: res.data.title,
             body: res.data.body,
             tag_name: res.data.tag_name,
             type: res.data.type,
             tags: res.data.postselectedtags,
             comments: res.data.is_commentable ? true : false,
            });
            setIsCommentable(res.data.is_commentable);
          }).catch((error) => {
            setErrors(error.errors)
          });
    }
    axiosClient.get('/taglist')
    .then((res) =>{
       setTags(res.data.data);
    }).catch((error)=> {
       setNotification(error);
    });
     setPost({...post, tags: selectedTags})
  }, [selectedTags])

  useEffect(()  => {
    setPost({...post, comments: isCommentable ? true : false})
  },[isCommentable])

  function toggleCommentable() {
        setIsCommentable(!isCommentable);
  }

  function selectTags() {
    const options = event.target.selectedOptions;
    const values = Array.from(options).map((option) => option.value);
    const webVal = Array.from(options).map((option) => option.textContent);

    if (!id) {
      setPost({...post, tag_name: webVal })
    }

    setSelectedTags(values);
 }


  const handleImage = (e) => {
    setSelectImage((e.target.files[0]))
  }


  const uploadToServer = (e) =>
  {
       e.preventDefault();
       const loopedtags = [];
       if(post.id){
        setLoading(true)
        setSelectedTags([])
        const testing = "2";
        selectedTags.forEach((tag) => {
            loopedtags.push(parseInt(tag))
          })
         const finaltagloop = post.tags.concat(loopedtags)

         axiosClient.put(`/posts/${post.id}`, {
            title: post.title, body:post.body,
            tags: finaltagloop, type: post.type,
            comments: post.comments,
         }).then((res)  => {
               setNotification(
                "Your scene has been updated!"
                );
                setLoading(false)
                setInterval(() => {
                    navigate('/dashboard/admin/posts')
                 }, 4000);
         }).catch((error) =>  {
            setLoading(false)
            setErrors(error.errors)
        });
       } else {
        setLoading(true)
       const formData = new FormData();
        formData.append('title',post.title)
        formData.append('body', post.body)
        selectedTags.forEach((tag) => {
            formData.append('tags[]', tag);
          })
        formData.append('type',post.type)
        formData.append('cover_image', selectImage )
        formData.append('published_at', post.published_at)
        formData.append('comments', post.comments)
        formData.append('photo_credit_text', post.photo_credit_text )
        formData.append('photo_credit_link', post.photo_credit_link)
        sendData(formData)
       }
  }

  const sendData = async (data) => {

    try {
          const res = await axiosClient.post('/posts', data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
          })
          setNotification(
            "Content has been created, Create a scene to finish up!"
            );
            setLoading(false);
            setInterval(() => {
                navigate('/dashboard/admin/posts')
             }, 4000);
    } catch (error) {
        setLoading(false)
        setErrors(error.errors)
        setTimeout(() => {
            setErrors(null);
        }, 5000);
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
              {id ? ('Update scene'):('Publish new scene')}
            </Typography>
            <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

         {!loading ? ( <div>
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
            <div
            style={{
                width: "800px",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "black",
                padding: "1rem",
                border: "2px solid purple",
              }} className="alert">
              {Object.keys(errors).map(key => (
                <ul>
                <li key={key}> <p style={{color:"red"}}>{errors[key]} </p></li>
                </ul>
              ))}
            </div>
          }

        {id ? (''):(<div>
            <div>
        <label>Thumbnail</label>
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
        </div>)}

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
       <textarea
       onChange = {(e) => setPost({...post, body: e.target.value })}
          type="text"
          id="body"
          name="body"
          cols="30" rows="10"
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
         ></textarea>
        <br />
        <br />


         {id ? (''):(<div>
            <div>
        <label>Set Date</label>
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
            required
        />
        <br />
        <br />
         </div>)}

        <div>
        <label>Visibilty: {post.type} $</label>
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
        <label>My Tags: {post.tag_name.length != 0 ? (post.tag_name.map(value =>
          <button disabled key={value.toString()}>{value+', '}</button>
        )):('none')}</label>
       </div>
        {id ? (<button disabled  className="category-btn" style={{
          background: "grey",
          color: "white"}}> delete tags</button>):(<div>  <button onClick={(e) => setPost({...post, tags: [], tag_name: []})}
        className="category-btn" style={{
          background: "grey",
          color: "white"}}> clear tags</button> </div>)}
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

        {id ? (''):(<div> <div>
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
          placeholder="(optional)"
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
          placeholder="(optional)"
        />
        <br />
        <br />
 </div> ) }


        <div>
        <label>Enable Comments</label>
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
        <p> {isCommentable ? ('Comments are turned ON'):('Comments are turned OFF') } </p>
        <br />
        <br />
        <button type="submit" className='btn'>
          Submit
        </button>
      </form>
          </div>):(<div><Loader /></div>)}
          </div>
          </Box>
        </Container>
    );
  }
