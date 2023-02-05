import { useEffect } from "react";
import axiosClient from "../../../../axios-client";


const Writers = () => {

    useEffect(() => {
        getWriters();
    });

    const getWriters = async () => {
        try {
            const res = await axiosClient.get('/writers')
            console.log(res.data)
        } catch (error) {
           console.log(error)
        }
    }

    return (<div>
        <h4>Writers</h4>
    </div>
    );
}


export default Writers;
