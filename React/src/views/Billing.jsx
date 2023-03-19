
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Helmet } from "react-helmet";
import "../components/SignupStyles.css";

const Billing = () => {
    let {id}  = useParams();
    const {notification,setNotification,token} = useStateContext();
    const link = '/signup/plan/'+'p';
    const [billingInfo,setBillingInfo] = useState({
        payment_method: null,
        plan: id,
        intent: null ,
        name:  '',
        email:'' ,
        line1: '',
        line2: '',
        city: '' ,
        state: '' ,
        country: '',
        postal_code: '',
        card_name: '' ,
    })

    const theScript = `
    const thestripe =Stripe('pk_test_51MHtvbHV3oSwznu1KawPrtJhnDhcAAVL68An2OagvrgFGirJURupDniwRRCiFlSUvUh5l9QUaTaA0eOdcNB6HisF00DV37zLut');

    const elements = thestripe.elements();
    const cardElement = elements.create('card');

    const cardHolderName = document.getElementById('card-holder-name');
    const cardButton = document.getElementById('card-button');
    const clientSecret = cardButton.dataset.secret;
    cardElement.mount('#card-element');

    cardElement.addEventListener('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Handle Form submission
    const paymentForm = document.getElementById('payment-form');

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        thestripe.handleCardSetup(cardButton.dataset.secret, cardElement, {
                payment_method_data: {
                    billing_details: {
                        name: cardHolderName.value
                    }
                }
            }).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    const paymentMethodInput = document.getElementById('payment-method');
                    paymentMethodInput.value = result.setupIntent.payment_method;
                    paymentForm.submit();
                }
            });
    });

  `;

    useEffect(() => {
        getPaymentDetails();
        setNotification('fetching data...');

        const script = document.createElement('script');
        script.innerHTML = theScript;
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };

    },[]) 

    const getPaymentDetails = async () => {
        try {
            const res = await axiosClient.get('/payments')
            if (res.data.success) {
                setBillingInfo(res.data.data)
            } else {
                setNotification(res.data.erros);
            }
        } catch (error) {
            setNotification(error)
        }
    }

   const handlesubmit = (event) => {
    setNotification('processing..')
    event.preventDefault();
    const payload = {
        payment_method: billingInfo.payment_method,
        plan: billingInfo.plan,
        line1: billingInfo.line1,
        line2: billingInfo.line2,
        city: billingInfo.city,
        state: billingInfo.state,
        country: billingInfo.country,
        postal_code: billingInfo.postal_code,
    }
    sendData(payload);
   }

   const sendData = async (payload) => {
     try {
         const res = await axiosClient.post('/payments',payload)
         if (res.data.success) {
            setTimeout(function(){
                setNotification(res.data.message)
                navigate('/dashboard/index')
            }, 5000)
         } else {
            setNotification(res.data.errors)
         }
     } catch (error) {
        setNotification(error)
     }
   }

    return (
        <div>
        <Navbar/>
        {token ? (        <div className="l-app" data-theme='dark'>
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
            <p className='l-divider'><span>Checkout</span></p>
            <form id="payment-form" onSubmit={handlesubmit}>

            <input type="hidden" name="plan" id="plan" value={id} />
            <input type="hidden" name="payment-method" id="payment-method" onChange={ev => setBillingInfo({...billingInfo, payment_method: ev.target.value }) }/>

                    <h2>
                        <span class="side-title">
                            Customer information
                        </span>
                    </h2>

              <label>Name </label>
              <input type='text' id="name" name="name" value={billingInfo.name} onChange={ev => setBillingInfo({...billingInfo, name: ev.target.value }) }  placeholder='enter name'/>

              <label>Email </label>
              <input type='email' id="email" name="email" value={billingInfo.email} onChange={ev => setBillingInfo({...billingInfo, email: ev.target.value }) } placeholder=" placeholder='enter email" disabled/>

              <label>Street or PO Box </label>
              <input type='text' id="line1" name="line1" value={billingInfo.line1} onChange={ev => setBillingInfo({...billingInfo, line1: ev.target.value }) } placeholder='enter address 1' />

              <label>Apartment Or Building </label>
              <input type='text' id="line2" name="line2" value={billingInfo.line2} onChange={ev => setBillingInfo({...billingInfo, line2: ev.target.value }) } placeholder='enter Address 2' />

              <label>City</label>
              <input type='text' id="city" name="city" value={billingInfo.city} onChange={ev => setBillingInfo({...billingInfo, city: ev.target.value }) }  placeholder='enter your city' />

              <label> State </label>
              <input type='text' id="state" name="state" value={billingInfo.state} onChange={ev => setBillingInfo({...billingInfo, state: ev.target.value }) } placeholder='enter your state' />

              <label> Country </label>
              <input type='text' id="country" name="country" value={billingInfo.country} onChange={ev => setBillingInfo({...billingInfo, country: ev.target.value }) }  placeholder='enter your country' />

              <label> Postal Code </label>
              <input type='text' id="postal_code" name="postal_code" value={billingInfo.postal_code} onChange={ev => setBillingInfo({...billingInfo, postal_code: ev.target.value }) }  placeholder='postal_code' />

                      <h2>
                        <span class="side-title">
                        Payment information
                        </span>
                    </h2>

                    <label> Card Name </label>
                  <input type='text' id="card-holder-name" name="card-name" value={billingInfo.name} onChange={ev => setBillingInfo({...billingInfo, name: ev.target.value }) } />

                  <label> Card Info </label>
                  <div id="card-element" className="p-3 bg-white border border-gray-300 rounded"></div>
                  <div id="card-errors" className="space-y-2 text-red-500"></div>

              <button id="card-button" data-secret={billingInfo.intent && billingInfo.intent.client_secret} type="submit">Pay now</button>
            </form>
          </div>
        </div>
      </div>):(<Navigate to={link}/>) }
    <Footer />
    </div>
    )
}


export default Billing;
