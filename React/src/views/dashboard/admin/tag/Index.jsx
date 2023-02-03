import { useEffect } from "react";
import axiosClient from "../../../../axios-client";


const Tags = () => {

    useEffect(() => {
        getTags();
    });

    const getTags = async () => {
        try {
            const res = await axiosClient.get('/tags')
            console.log(res.data)
        } catch (error) {
           console.log(error)
        }
    }

    return (<div>
        <h3>Tags</h3>
    </div>
    );
}


export default Tags;
