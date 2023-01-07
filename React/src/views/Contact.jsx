import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import Chero from "../components/Cheros";


const Contact = () => {
   return (
    <div>
        <Navbar/>
        <Chero heading='CONTACT' text='- Support team -'/>
        <Form/>
        <Footer/>
    </div>
   )
}

export default Contact;
