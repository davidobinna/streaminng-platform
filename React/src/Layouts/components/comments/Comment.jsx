import { Avatar, Button, Card, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { useStateContext } from "../../../contexts/ContextProvider";
import ConfirmDelete from "./ConfirmDelete";
import replyArrow from  "../../../assets/icon-reply.svg";
import YouTag from "./YouTag";
import theme from "../../../commentstyles";


const Comment = ({ onPass }) => {
 const { id, content, createdAt, score, replies, user } = onPass;
 const { IMGOBJ } = useStateContext();
 const userName = user.username;
 const ava = IMGOBJ[`${userName}`];

const [clicked, setClicked] = useState(false);
const [editingComm, setEditingComm] = useState(false);
const [commentText, setCommentText] = useState(content);
const [openModal, setOpenModal]    = useState(false);

const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
   return (
    <ThemeProvider theme={theme}>
        <ConfirmDelete onOpen={openModal} onClose={handleClose} id={id} />
        <Card>
        <Box sx={{ width: "100%", backgroundColor:"#000", }}>
        <Stack
                spacing={5}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor= "#000"
              >
                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar src={ava}></Avatar>
                  <Typography
                    fontWeight="bold"
                    sx={{ color: "white" }}
                  >
                    {userName}
                  </Typography>
                  {userName === "juliusomo" && <YouTag />}
                  <Typography sx={{ color: "yellow" }}>
                    {createdAt}
                  </Typography>
                </Stack>
                {userName === "juliusomo" ? (
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<Delete />}
                      sx={{
                        color: "custom.softRed",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="text"
                      disabled={editingComm}
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "custom.moderateBlue",
                      }}
                      startIcon={<Edit />}
                      onClick={() => setEditingComm(!editingComm)}
                    >
                      Edit
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    onClick={() => {
                      setClicked(!clicked);
                    }}
                    variant="text"
                    sx={{
                      fontWeight: 500,
                      textTransform: "capitalize",
                      color: "custom.moderateBlue",
                    }}
                    startIcon={<img src={replyArrow} alt="reply sign" />}
                  >
                    Reply
                  </Button>
                )}
              </Stack>
              {editingComm ? (
                <>
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
                     value={commentText}
                     onChange={(e) => {
                       setCommentText(e.target.value);
                     }}
                     placeholder="Edit Your Comment">

                    </textarea>

                  <Button
                    sx={{
                      float: "right",
                      bgcolor: "#9c02e4",
                      color: "neutral.white",
                      p: "8px 25px",
                      "&:hover": {
                        bgcolor: "custom.lightGrayishBlue",
                      },
                    }}
                    onClick={() => {
                      !commentText.trim()
                        ? alert(
                            "If  you want to remove the comment text, just delete the comment."
                          )
                        : setEditingComm(!editingComm);
                    }}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Typography spacing={5} sx={{ backgroundColor:"#000", color: "neutral.grayishBlue", p: "20px 0" }}>
                  {commentText}
                </Typography>
              )}
        </Box>
        </Card>
    </ThemeProvider>
   )
};

export default Comment;
