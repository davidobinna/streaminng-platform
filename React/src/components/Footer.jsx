import './FooterStyles.css';
import { FaFacebook, FaLinkedin, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='left'>
                    <div className='location'>
                       <FaSearchLocation size={20} style={{color: '#ffffff', marginRight: '2rem'}} />
                      <div>
                        <p>112 St. Road</p>
                        <h4> Imo, Nigeria</h4>
                      </div>
                 </div>
                 <div className='phone'>
                    <h4><FaPhone size={20} style={{color: '#ffffff', marginRight: '2rem'}}/> +234 903-719-3017</h4>
                 </div>
                 <div className='email'>
                    <h4><FaMailBulk size={20} style={{color: '#ffffff', marginRight: '2rem'}}/> nasais@info.com</h4>
                 </div>
              </div>
              <div className='right'>
                <h4>About Company</h4>
                <p>"nas AIS is a softawre company based in nigeria,
                     our mission is to transform the mind of creators, readers & writers around the world.
                     Streaming Artificial Imaginations will make you embrace the future of Art,
                     Culture, History, Mindset and Presentation. With our powerful AI models & APIs, we're able transform writer's Imagination to 4k Video Streaming."
                     </p>
                     <div className='social'>
                       <FaFacebook size={30} style={{color: '#ffffff', marginRight: '1rem'}}/>
                       <FaTwitter size={30} style={{color: '#ffffff', marginRight: '1rem'}}/>
                       <FaLinkedin size={30} style={{color: '#ffffff', marginRight: '1rem'}}/>
                     </div>
              </div>
            </div>
        </div>
    )
}


export default Footer;
