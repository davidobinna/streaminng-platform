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
            <p>- free newsletter -</p>
            <p>- Featured Channels -</p>
            <p>- checkout access -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
           <div className='card'>
            <h3>- Writer -</h3>
            <span className='bar'></span>
            <p className='btc'>$5.00</p>
            <p>- monthly -</p>
            <p>- 4k Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Funds Ownership -</p>
            <p>- AI Words Prediction -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <p>- Free Drive Storage -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
           <div className='card'>
            <h3>- Premium -</h3>
            <span className='bar'></span>
            <p className='btc'>$10.00</p>
            <p>- monthly -</p>
            <p>- 4k Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Administrator's Role -</p>
            <p>- Funds Ownership -</p>
            <p>- AI Words Prediction -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <p>- Free Drive Storage -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
        </div>
        </div>
    )
}
export default Pricing;
