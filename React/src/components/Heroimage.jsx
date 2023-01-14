import { Component } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import './Heroimage.css';


const Heroimage = (props) => {
const {notification} = useStateContext();
    return (
    <div className='heroo-img'>
        <div className='heading'>
        <h1>{props.heading} </h1>
            <p>{props.text}</p>
            {notification &&
                <div className="notification">
            {notification}
          </div>}
        </div>
    </div>
   )
}


export default Heroimage;
