import { Stack } from "@mui/material";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

const Comments = (props) => {
const [errors, setErrors] = useState(null)
const [loading, setLoading] = useState(false)
const {setNotification}  = useStateContext();
const [comments,setComments] = useState({
    body:'',
    commentable_id: parseInt(props.id),
    commentable_type: props.model_name,
})


    return (
        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
        {!props.value? (<h4
          style={{
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          color: "grey",
          backgroundColor: "black",
          padding: "1rem",
          border: "2px solid purple",
        }}>Comments are turned Off</h4>):(
        <div
           style={{
            width: "100%",
            height: "150px",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}>
        <textarea
         onChange={e => setComments({...comments, body: e.target.value})}
          type="text"
          id="body"
          name="body"
          cols="30" rows="10"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}
          placeholder="leave a comment"
         ></textarea>
         <button onClick={
             async (e) => {
                e.preventDefault()
                await axiosClient.post('/comment',comments)
                 .then((res) => {
                    console.log(res.data)
                 }).catch((error)=>{
                    console.log(error)
                 })
             }
         }>submit</button>
         </div>
         )}
       </Stack>
    )
}

export default Comments;
