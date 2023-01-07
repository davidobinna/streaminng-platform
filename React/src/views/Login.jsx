import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/SignupStyles.css";

function Login() {
const {id} = useParams()
    return (
        <div>
        <Navbar/>
        <div className="l-app" data-theme='dark'>
        <div className='l-login'>
          <h2> welcome!</h2>
          <div className='l-container'>
            <div className='l-top'>
              <i className='fab fa-google'></i>
              <i className='fab fa-facebook-square'></i>
              <i className='fab fa-linkedin'></i>
              <i className='fab fa-twitter-square'></i>
              <i className='fab fa-apple'></i>
            </div>
            <p className='l-divider'><span>Login</span></p>
            <form>
              <label>E-mail </label>
              <input type='email' placeholder='enter your email' />
              <label>Password</label>
              <input type='password' placeholder='enter your password' />
             
              <button>Login</button>
            </form>
            <div className='l-bottom'>
              <p>Forget your password?</p>
              <a href='/'>Reset Password</a>
            </div>
            <Link to="/signup"><p className='l-create'>Create Account</p></Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    )
}


export default Login;



