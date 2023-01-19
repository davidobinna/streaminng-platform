import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './PricingStyles.css';

const Pricing = () => {
const {plan,setPlan,setNotification,setUser} = useStateContext()
    useEffect(() => {
        getPlan()
        setNotification('fetching data...')
    },[])

 const getPlan = async () => {
         try {
            const res = await axiosClient.get('/membership')
             if (res.data.success) {
                setPlan(res.data.record)
             } else {
                setNotification(res.data.errors)
                setPlan({})
             }
         } catch (error) {
            setPlan({})
            setNotification(error)
         }
    }

    return (
        <div>
            <div className='pricing'>
            <div className='card-container'>
            <div className='card'>
            <h3>- Visitor -</h3>
            <span className='bar'></span>
            <p className='btc'>$0</p>
            <p>- /free  -</p>
            <p>- Free Sign up -</p>
            <p>- Free newsletter -</p>
            <p>- Featured Channels -</p>
            <p>- Checkout access -</p>
            <p>- Blog access -</p>
            <Link to='/signup/new' className='btn'>Proceed</Link>
           </div>
            {plan && plan.map(item =>
            <div key={item.id} className='card'>
            <h3>- {item.name} -</h3>
            <span className='bar'></span>
            <p className='btc'>{item.price}</p>
            <p>-{item.abbreviation} -</p>
            <p>- 4k HD Video Rendering -</p>
            <p>- Speech Recognition -</p>
            <p>- Funds Withdrawal -</p>
            <p>- GPT3.5 Assistant -</p>
            <p>- Free Facebook Ads -</p>
            <p>- Realtime Analytics -</p>
            <p>- Free Drive Storage -</p>
            <Link to={'/billing/'+item.plan} className='btn'>Proceed</Link>
           </div>
           )}
        </div>
        </div>
        </div>
    )
}
export default Pricing;
