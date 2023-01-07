import './VideoStyles.css';

import Hero from '../assets/Hero.mp4';
import { Link } from 'react-router-dom';

const Video = () => {
    return (
        <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src={Hero} type='video/mp4' />
            </video>
            <div className='content'>
                <h1>nas AIS</h1>
                <p>Artificial Imagination Studio</p>
            <div>
                <Link to='/explore' className='btn'>Not Now</Link>
                <Link to='/signup' className='btn btn-light'>Sign Up</Link>
            </div>
           </div>
        </div>
    )
}

export default Video;
