import './VideoStyles.css';

import Hero from '../assets/Hero.mp4';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Video = () => {
    const {token} = useStateContext();
    return (
        <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src={Hero} type='video/mp4' />
            </video>
            <div className='content'>
                <h1>Arc</h1>
                <p>AI Motion Architech</p>
            <div>
                {!token &&
                <Link to='/feed' className='btn'>Not Now</Link>
                }
                {!token &&
                <Link to='/login' className='btn btn-light'>Sign In</Link>
                }
             {
                token &&
                <Link to='/dashboard' className='btn'>Go to Dashboard</Link>
             }
            </div>
           </div>
        </div>
    )
}

export default Video;
