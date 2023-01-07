import { createRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/SignupStyles.css";
import { useStateContext } from "../contexts/ContextProvider";
import { Alert } from "bootstrap";

function Signup() {
const { setUser, setToken, setNotification} = useStateContext();
const [errors, setErrors] = useState({
    name:null,
    email:null,
    password:null
});
const nameRef = createRef()
const emailRef = createRef()
const passwordRef = createRef()
const passwordConfirmationRef = createRef()

const onSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
    }
    signUp(payload)
}

const signUp = async (payload) => {
     try {
          const res = await axiosClient.post('/signup',payload)
          if (res.data.success) {
              setUser(res.data.user)
              setToken(res.data.Token)
              setNotification('Sign up was Successful!')
              console.log(res.data)
          } else {
            setErrors({
                name:res.data.errors.name,
                email:res.data.errors.email,
                password:res.data.errors.password,
            })
            console.log(errors)
          }
     } catch (error) {
        console.log(error)
        setNotification(error)
     }
}

    return (
        <div>
        <Navbar/>
        <div className="l-app" data-theme='dark'>
        <div className='l-login'>
          <h2> Hello!</h2>
          <div className='l-container'>
            <div className='l-top'>
              <i className='fab fa-google'></i>
              <i className='fab fa-facebook-square'></i>
              <i className='fab fa-linkedin'></i>
              <i className='fab fa-twitter-square'></i>
              <i className='fab fa-apple'></i>
            </div>
            <p className='l-divider'><span>sign up</span></p>
            <form onSubmit={onSubmit}>
              <label>Full Name</label>
              <input ref={nameRef}   type='text' placeholder='enter your full name' />
               <p>{errors.name ? errors.name : null }</p>
              <label>E-mail </label>
              <input ref={emailRef}   type='email' placeholder='enter your email' />
              <p>{errors.email ? errors.email : null }</p>
              <label>Password</label>
              <input ref={passwordRef} type='password' placeholder='enter your password' />
              <p>{errors.password ? errors.password : null }</p>
              <label>Confirm Password</label>
              <input ref={passwordConfirmationRef} type='password' placeholder='re-type password' />
              <button>Submit</button>
            </form>
            <div className='l-bottom'>
              <p>Already Signed?</p>
            </div>
            <Link to="/login"><p className='l-create'>Login </p></Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    )
}


export default Signup;



