import Aheros from "../components/Aheros";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Notice from "../components/Notice";

const Anouncement = () => {
    return (
        <div>
           <Navbar/>
           <Aheros heading='ANOUNCEMENT' text='- public notice -'/>
           <Notice/>
           <Footer/>
        </div>
    )
}

export default Anouncement;
