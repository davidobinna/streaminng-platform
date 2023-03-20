import { Avatar, Box, Stack, Typography } from '@mui/material';

const Comment = ({ comment, depth }) => {
  return (
    <Box  sx={{ pl: depth * 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 1 }}>{comment.user.name[0]}</Avatar>
        <Typography variant={{ sm: "subtitle1", md: 'h6' }}
        >{comment.user.name}</Typography>
      </Box>
      <Typography  variant="body1">{comment.text}</Typography>
      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </Box>
  );
};

export default Comment;
