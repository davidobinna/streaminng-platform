import { Component } from 'react';
import './CheroStyles.css';

const Chero = (props) => {
    return (
    <div className='chero-img'>
        <div className='heading'>
        <h1>{props.heading} </h1>
            <p>{props.text}</p>
        </div>
    </div>
   )
}


export default Chero;
