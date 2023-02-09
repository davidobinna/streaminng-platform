import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { Loader } from "../../../../Layouts/components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { DeleteButton, EditButton } from '../../../../Layouts/components/Icons';


const Users = () => {
const {setNotification} = useStateContext()
const [tags, setTags] = useState([])
const [loading, setLoading] = useState(false)
const [meta,setMeta] = useState([])
const count ={
    value: 0,
}

useEffect(()=> {
    setLoading(true)
    getTags()
},[]);

const getTags = async () => {
    try {
         const res = await axiosClient.get('/tags')
         setLoading(false)
         setTags(res.data.data)
         setMeta(res.data.meta.links)
    } catch (error) {
        setLoading(false)
        setNotification(error)
    }
}

const nextLink = async (link) => {
    const url = link.substring(25)
    setLoading(true)
      try {
          const res = await axiosClient.get(url)
          setLoading(false)
          setTags(res.data.data)
      } catch (error) {
        setLoading(false)
        setNotification(error)
      }
}

    return (
<div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h4>All Tags</h4>
        <Link to="/dashboard/admin/tags/new" className="category-btn" style={{
          background: "#FC1503",
          color: "white"}} >Add a new tag</Link>
      </div>
      <div className="card animated fadeInDown">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        {loading && <TableBody>
            <TableRow>
                <TableCell colSpan="10" className="text-center">
                   <Loader />
                </TableCell>
            </TableRow>
        </TableBody> }
        <TableBody>
            {!loading && Object.keys(tags).map(item => (
            <TableRow
              key={item.toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {tags[item].id}
              </TableCell>
              <TableCell >{tags[item].name}</TableCell>
              <TableCell >{tags[item].slug}</TableCell>
              <TableCell >{tags[item].created_at}</TableCell>
              <TableCell>
                <div>
                <EditButton  to={`/dashboard/admin/tags/${tags[item].id}`} />
                <DeleteButton/>
                 </div>
                 </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <div style={{display: 'flex', alignItems: "center"}}>
       { meta.length > 0  && meta.map( items => (
            <button onClick={() => nextLink(items.url)} className="category-btn">{count.value++}</button>
            ))}
            </div>
    </div>
    )
}


export default Users;
