import { createRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/SignupStyles.css";
import { useStateContext } from "../contexts/ContextProvider";


function Signup() {
    const fstyles = {
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
       },
       span: {
            padding: "0 10px",
            backgroundColor: "var(--form-bg)",
       }
    }
const { setToken, setNotification, notification, setDefaultUser, setAdmin} = useStateContext();
const [errors, setErrors] = useState({
    name:null,
    email:null,
    password:null
});

const nameRef = createRef()
const emailRef = createRef()
const passwordRef = createRef()
const passwordConfirmationRef = createRef()
const [loading, setLoading]  = useState(false)
const navigate = useNavigate();
const styles = {
    errorStyle: {
        color:'red',
        size: '4rem',
    }
}


const onSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
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
                setDefaultUser(res.data.default);
                setAdmin(res.data.admin);
                setToken(res.data.token);
                setNotification('Sign up was Successful!');
          } else {
            setErrors({
                name:res.data.errors.name,
                email:res.data.errors.email,
                password:res.data.errors.password,
            })
            setLoading(false)
          }
     } catch (error) {
        setNotification(error)
        setLoading(false)
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
            <p className='l-divider'><span style={fstyles.span}>sign up</span></p>
            {notification &&
                <div className="notification">
            {notification}
          </div>}
            {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
            <form onSubmit={onSubmit} style={fstyles.form}>
              <label>Full Name</label>
              <p style={styles.errorStyle}>{errors.name ? errors.name : null }</p>
              <input ref={nameRef}   type='text' placeholder='enter your full name' />

              <label>E-mail </label>
              <p style={styles.errorStyle}>{errors.email ? errors.email : null }</p>
              <input ref={emailRef}   type='email' placeholder='enter your email' />

              <label>Password</label>
              <p style={styles.errorStyle}>{errors.password ? errors.password : null }</p>
              <input ref={passwordRef} type='password' placeholder='enter your password' />

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



