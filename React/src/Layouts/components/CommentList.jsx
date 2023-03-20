import { Box, Stack } from '@mui/material';
import Comment from './comment';

const CommentList = ({ comments }) => {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
    <Box
     style={{
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            padding: "1rem",
            border: "2px solid purple",
          }}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={0} />
      ))}
    </Box>
    </Stack>
  );
};

export default CommentList;
