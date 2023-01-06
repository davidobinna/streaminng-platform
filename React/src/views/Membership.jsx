import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heroimage from "../components/Heroimage";
import Pricing from "../components/pricing";

function Membership() {
    return (
        <div>
          <Navbar/>
          <Heroimage heading='PRICING' text='Choose a plan'/>
             <Pricing/>
            <Footer/>
        </div>
    )
}


export default Membership;
