import Footer from "../components/Footer";
import Heroimage from "../components/Heroimage";
import Navbar from "../components/Navbar";
import Notice from "../components/Notice";

const Anouncement = () => {
    return (
        <div>
           <Navbar/>
           <Heroimage heading='ANOUNCEMENT' text='- public notice -'/>
           <Notice/>
           <Footer/>
        </div>
    )
}

export default Anouncement;
