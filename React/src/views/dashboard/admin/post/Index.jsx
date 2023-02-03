import { useEffect } from "react";
import axiosClient from "../../../../axios-client";


const Posts = () => {

    useEffect(() => {
        getPosts();
    });

    const getPosts = async () => {
        try {
            const res = await axiosClient.get('/posts')
            console.log(res.data)
        } catch (error) {
           console.log(error)
        }
    }

    return (<div>
        <h3>Posts</h3>
    </div>
    );
}


export default Posts;
