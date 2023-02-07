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


const Users = () => {
const {setNotification} = useStateContext()
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [meta,setMeta] = useState([])
const count ={
    value: 0,
}

useEffect(()=> {
    setLoading(true)
    getUsers()
},[]);

const getUsers = async () => {
    try {
         const res = await axiosClient.get('/users')
         setLoading(false)
         setUsers(res.data.data)
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
          setUsers(res.data.data)
      } catch (error) {
        setLoading(false)
        setNotification(error)
      }
}

    return (
<div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h4>All Users</h4>
        <Link to="/dashboard/admin/users/new" className="category-btn" style={{
          background: "#FC1503",
          color: "white"}} >Add new User</Link>
      </div>
      <div className="card animated fadeInDown">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email address</TableCell>
            <TableCell>Subscription</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Joined Date</TableCell>
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
            {!loading && Object.keys(users).map(item => (
            <TableRow
              key={item.toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {users[item].id}
              </TableCell>
              <TableCell >{users[item].name}</TableCell>
              <TableCell >{users[item].email}</TableCell>
              <TableCell >{users[item].subcription.length > 0 ? (users[item].subcription[name]+`<br/>`+users[item].subcription[stripe_status]):('Not Subscribed')}</TableCell>
              <TableCell>
              {users[item].type === 4 ? ("Admin"):('')}
              {users[item].type === 5 ? ("SuperAdmin"):('') }
              {users[item].type === 2 ? ("Moderator"):('') }
              {users[item].type === 3 ? ("Writer"):('') }
              {users[item].type === 1 ? ("Default"):('') }
              </TableCell>
              <TableCell >{users[item].joinedDate}</TableCell>
              <TableCell>Action</TableCell>
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


/** {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))} **/
