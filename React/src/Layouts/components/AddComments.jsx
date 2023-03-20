import { Stack } from "@mui/material";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { Loader } from "./";
import { useStateContext } from "../../contexts/ContextProvider";

const AddComments = (props) => {
const [errors, setErrors] = useState(null)
const [loading, setLoading] = useState(false)
const {setNotification}  = useStateContext();
const [comments,setComments] = useState({
    body:'',
    commentable_id: parseInt(props.id),
    commentable_type: props.model_name,
})


    return (
        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff", pb:"5rem" }} py={1} px={2}>
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
         {loading? (<div> <p>Loadng...</p> </div>):(
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
                     placeholder="leave a comment"></textarea>

         )}
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
         <button
          onClick={
             async (e) => {
                e.preventDefault()
                setLoading(true)
                await axiosClient.post('/comment',comments)
                 .then((res) => {
                    setLoading(false)
                    console.log(res.data)
                 }).catch((error)=>{
                    setLoading(false)
                    console.log(error)
                    setErrors(error.errors)
                 })
             }
         }>submit</button>
         </div>
         )}
       </Stack>
    )
}

export default AddComments;
