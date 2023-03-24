import { Container, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import AddComment from "./AddComment";
import Comment from "./Comment";


var MODELNAME = 'posts';


const Core = () => {
  const { commentSection }  = useStateContext();
  const { id } = useParams();
  const CommentRelation = {
    modelType: MODELNAME,
    modelId: parseInt(id),
    depthLevel: 4,
  }
    return (
        <Container maxWidth="md">
            <Stack spacing={3}>
                {commentSection.map((comment) => {
                     return <Comment key={comment.id} onPass={comment} />;
                })}
                <AddComment relation={CommentRelation}/>
            </Stack>
        </Container>
    )
}

export default Core;
