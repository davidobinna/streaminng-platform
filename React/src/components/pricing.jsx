import { Link } from 'react-router-dom';
import './PricingStyles.css';

const Pricing = () => {
    return (
        <div className='pricing'>
            <div className='card-container'>
           <div className='card'>
            <h3>- Visitor -</h3>
            <span className='bar'></span>
            <p className='btc'>$0.00</p>
            <p>- unlimited -</p>
            <p>- free Sign up -</p>
            <p>- streaming access -</p>
            <p>- free newsletters -</p>
            <p>- Featured Channels -</p>
            <p>- checkout access -</p>
            <Link to='/signup' className='btn'>Sign Up</Link>
           </div>
           <div className='card'>
            <h3>- Writer -</h3>
            <span className='bar'></span>
            <p className='btc'>$5.00</p>
            <p>- monthly -</p>
            <p>- Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Funds Ownership -</p>
            <p>- AI Virtual Assistant -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <Link to='/signup' className='btn'>Sign Up</Link>
           </div>
           <div className='card'>
            <h3>- Premium -</h3>
            <span className='bar'></span>
            <p className='btc'>$10.00</p>
            <p>- monthly -</p>
            <p>- Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Administrator's Role -</p>
            <p>- Funds Ownership -</p>
            <p>- AI Virtual Assistant -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <Link to='/signup' className='btn'>Sign Up</Link>
           </div>
        </div>
        </div>
    )
}
export default Pricing;
