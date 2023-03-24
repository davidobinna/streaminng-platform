import { Avatar, Button, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import theme from "../../../commentstyles";
import { Box } from "@mui/system";
import axiosClient from "../../../axios-client";
import Loader from "../Loader";

const AddComment = ({relation}) => {
  const {modelType, modelId, depthLevel} = relation;
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {IMGOBJ, addComment, user, setNotification}  = useStateContext();
  const [commentTxt, setCommentTxt] = useState("");
  const [comments, setComments] = useState({
    body:'',
    commentable_id: modelId,
    commentable_type: modelType,
    depth: depthLevel,
  })


   return (
    <ThemeProvider theme={theme}>
          {errors && Object.keys(errors).map( item => (
              <span
                style={{
                color: "Red",
                backgroundColor: "black",
                padding: "1rem",
              }} key={item}>{errors[item][0]}
               { setInterval(() => {
                setErrors(null)
              }, 4000) }
              </span>
            ))}
       <Box sx={{ p: "15px" }}>
       <Stack direction="row" spacing={2} alignItems="flex-start">
            {!user.id ? (<Avatar sx={{ width:45, height:45, bgcolor: deepPurple[500] }}>MV</Avatar>
            ):(<Avatar
              alt="profile"
              variant="rounded"
             src={user?.profile_photo_path || IMGOBJ.juliusomo  }
             sx={{width:45, height:45}} />) }

             {loading? (<div> <h4>Loading...</h4> </div>):(
                <textarea
                type="text"
                id="body"
                name="body"
                cols="30" rows="8"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "black",
                  padding: "1rem",
                  border: "2px solid purple",
                }}
                value={commentTxt}
                onChange={(e) => {
                  setCommentTxt(e.target.value);
                  setComments({...comments, body: e.target.value})
                }}
                placeholder="leave a comment">

       </textarea>
             )}

       </Stack>
       <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ color: "#fff", pb:"5rem", pl:"3.5rem" }} py={1} px={2}>
       <Button
              size="medium"
              sx={{
                bgcolor: "#9c02e4",
                color: "neutral.white",
                p: "8px 25px",
                "&:hover": {
                  bgcolor: "grey",
                },
              }}
              onClick={async (e) => {
                !commentTxt.trim()
                  ? e.preventDefault()
                  : addComment(commentTxt.trim());
                  e.preventDefault()
                  setLoading(true)
                  await axiosClient.post('/comment',comments)
                    .then((res) => {
                            setLoading(false)
                            console.log(res.data)
                        }).catch((error) => {
                            setLoading(false)
                            setErrors(error.errors)
                        })
                setCommentTxt("");
              }}
            >
              Submit
            </Button>
        </Stack>
       </Box>
    </ThemeProvider>
   )
}

export default AddComment;
