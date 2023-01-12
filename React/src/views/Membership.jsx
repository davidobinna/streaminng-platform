import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heroimage from "../components/Heroimage";
import Pricing from "../components/pricing";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";


function Membership() {
    const link = '/signup/plan/'+'p';
    const {token} = useStateContext()
    return (
        <div>
        <Navbar/>
        <Heroimage heading='PRICING' text='- Choose a plan -'/>
        {token ? (<Pricing/>):(<Navigate to={link}/>) }
        <Footer/>
        </div>
    )
}


export default Membership;
