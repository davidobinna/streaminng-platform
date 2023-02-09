import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';


const DeleteButton = () => (
  <IconButton>
    <DeleteIcon />
  </IconButton>
);

const EditButton = (props) => (
  <IconButton component={Link} to={props.to}>
    <EditIcon />
  </IconButton>
);

export { DeleteButton, EditButton }


