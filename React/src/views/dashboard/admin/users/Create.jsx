import { useEffect } from "react";
import axiosClient from "../../../../axios-client";

const CreateUsers = () => {
useEffect(()=> {
    getUsers()
});

const getUsers = async () => {
    try {
         const res = axiosClient.get('/users')
         console.log(res.data)
    } catch (error) {
       console.log(error)
    }
}

    return (
        <div>
            <h4>Create Users</h4>
        </div>
    )
}


export default CreateUsers;
