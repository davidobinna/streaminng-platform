import { createRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/SignupStyles.css";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
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
        email:null,
        password:null
    });

    const emailRef = createRef()
    const passwordRef = createRef()
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
        email: emailRef.current.value,
        password: passwordRef.current.value,
    }
    LogIn(payload)
}

const LogIn = async (payload) => {
    try {
        const res = await axiosClient.post('/login',payload)
        if (res.data.success) {
             setDefaultUser(res.data.default);
             setAdmin(res.data.admin);
             setToken(res.data.token)
             setNotification(`${'Welcome Back ' + res.data.name + '!'}`)
        } else {
            setErrors(res.data.errors)
            setLoading(false)
        }
    } catch (error) {
        setLoading(false)
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
            <p className='l-divider'><span style={fstyles.span}>sign in</span></p>
            {notification &&
                <div className="notification">
            {notification}
          </div>}
            {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
          {
            typeof(errors) === 'string' && setNotification(errors)
          }
            <form onSubmit={onSubmit} style={fstyles.form}>

              <label>E-mail </label>
              <p style={styles.errorStyle}>{errors.email ? errors.email : null }</p>
              <input ref={emailRef}   type='email' placeholder='enter your email' />

              <label>Password</label>
              <p style={styles.errorStyle}>{errors.password ? errors.password : null }</p>
              <input ref={passwordRef} type='password' placeholder='enter your password' />

              <button>Login</button> 
            </form>
            <div className='l-bottom'>
            <p>Forget your password?</p>
            <a href='/'>Reset Password</a>
            </div>
            <div className='l-bottom'>
              <p>Not Signed?</p>
            </div>
            <Link to="/signup/new"><p className='l-create'>Sign Up </p></Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    )
}


export default Login;

