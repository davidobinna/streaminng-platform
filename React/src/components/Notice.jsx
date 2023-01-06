import Noticeimg from '../assets/Notice.jpeg';
import { Link } from 'react-router-dom';
import Weird from '../assets/Weird.jpeg';
import './NoticeStyles.css';

const Notice = () => {
    return (
        <div className='training'>
          <div className='left'>
            <h1>Ownership Of Funds</h1>
            <p>To all writers and premium users, this is to notify you that access to funds generated
                 from streaming, will be granted to you if and only if you are the rightful author/owner
                 of a written content or book that that was publiched on our channel, please contact support to confirm
                 ownership and get access to your funds. Please be aware that there's a 10-30 % commission from users resource which will
                 be negotiated during the interview. Goodluck!</p>
                 <Link to='/contact'><button className='btn'>Contact</button></Link>
          </div>
          <div className='right'>
             <div className='img-container'>
                <div className='image-stack top'>
                    <img src={Weird} className='img' alt="" />
                </div>
                <div className='image-stack buttom'>
                    <img src={Noticeimg} className='img' alt="" />
                </div>
             </div>
          </div>
        </div>
    )
}

export default Notice;
