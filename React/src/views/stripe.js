        const stripe = Stripe('pk_test_51MHtvbHV3oSwznu1KawPrtJhnDhcAAVL68An2OagvrgFGirJURupDniwRRCiFlSUvUh5l9QUaTaA0eOdcNB6HisF00DV37zLut');

        const elements = stripe.elements();
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
            stripe
                .handleCardSetup(clientSecret, cardElement, {
                    payment_method_data: {
                        billing_details: {
                            name: cardHolderName.value
                        }
                    }
                })
                .then(function(result) {
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
