import { Component } from 'react';
import './Heroimage.css';

const Heroimage = (props) => {
    return (
    <div className='heroo-img'>
        <div className='heading'>
        <h1>{props.heading} </h1>
            <p>{props.text}</p>
        </div>
    </div>
   )
}


export default Heroimage;
