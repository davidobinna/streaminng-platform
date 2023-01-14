import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './PricingStyles.css';

const Pricing = () => {
const {plan,setPlan,setNotification} = useStateContext()
    useEffect(() => {
        getPlan()
        setNotification('fetching data...') 
    },[])

 const getPlan = async () => {
         try {
            const res = await axiosClient.get('/membership')
             if (res.data.success) {
                setPlan(res.data.plans)
             } else {
                setNotification(res.data.errors)
                setPlan({})
             }
         } catch (error) {
            setNotification(error)
         }
    }

    return (
        <div>
           {!plan ? (""):(
            <div className='pricing'>
            <div className='card-container'>
            <div className='card'>
            <h3>- Visitor -</h3>
            <span className='bar'></span>
            <p className='btc'>$0</p>
            <p>- /regular  -</p>
            <p>- Free Sign up -</p>
            <p>- Free newsletter -</p>
            <p>- Featured Channels -</p>
            <p>- Checkout access -</p>
            <p>- Blog access -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
            <div className='card'>
            <h3>- Creators & Writers -</h3>
            <span className='bar'></span>
            <p className='btc'>$10</p>
            <p>- /monthly -</p>
            <p>- 4k HD Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Withdraw Funds -</p>
            <p>- GPT3.5 Assistant -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <p>- Free Drive Storage -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
           <div className='card'>
            <h3>- Creators & Writers -</h3>
            <span className='bar'></span>
            <p className='btc'>$100</p>
            <p>- /yearly -</p>
            <p>- 4k HD Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Withdraw Funds -</p>
            <p>- GPT3.5 Assistant -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <p>- Free Drive Storage -</p>
            <p>- Admin Role's & Policy -</p>
            <Link to='/signup' className='btn'>Proceed</Link>
           </div>
           </div>
        </div>)}
          

        </div>
    )
}
export default Pricing;
