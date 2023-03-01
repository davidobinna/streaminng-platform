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
import { EditButton } from "../../../../Layouts/components/Icons";


const Posts = () => {
const {setNotification} = useStateContext()
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)
const [meta,setMeta] = useState([])
const count ={
    value: 0,
}
    useEffect(() => {
        setLoading(true)
        getPosts()
    },[]);

    const getPosts = async () => {
        try {
            const res = await axiosClient.get('/posts')
            setLoading(false)
            setPosts(res.data.data)
            setMeta(res.data.meta.links)
        } catch (error) {
            setNotification(error)
        }
    }

    const nextLink = async (link) => {
        const url = link.substring(25)
        setLoading(true)
          try {
              const res = await axiosClient.get(url)
              setLoading(false)
              setPosts(res.data.data)
          } catch (error) {
            setLoading(false)
            setNotification(error)
          }
  }
    return (
        <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h4>All Posts</h4>
        <Link to="/dashboard/admin/posts/new" className="category-btn" style={{
          background: "#FC1503",
          color: "white"}} >Add new Posts</Link>
      </div>
      <div className="card animated fadeInDown">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Post ID</b></TableCell>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Excerpt</b></TableCell>
            <TableCell><b>Author</b></TableCell>
            <TableCell><b>Date Created</b></TableCell>
            <TableCell><b>Date Published</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
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
            {!loading && Object.keys(posts).map(item => (
            <TableRow
              key={item.toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {posts[item].id}
              </TableCell>
              <TableCell >{posts[item].title}</TableCell>
              <TableCell >{posts[item].excerpt}</TableCell>
              <TableCell >{posts[item].author}</TableCell>
              <TableCell>
              {posts[item].created_at}</TableCell>
              <TableCell>{posts[item].published_at}</TableCell>
              <TableCell>
                <div key={item.toString()} style={{display: 'flex', alignItems: "center"}}>
                    <EditButton to={`/dashboard/admin/posts/${posts[item].id}`}/>
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
    );
}


export default Posts;
