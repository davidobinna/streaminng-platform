import React, { useEffect, useRef } from 'react';

function MyComponent() {
  const stripeScript = `
    const stripe = Stripe('stripe-public-key');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  `;

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = stripeScript;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="card-element" />
    </div>
  );
}

export default MyComponent;
