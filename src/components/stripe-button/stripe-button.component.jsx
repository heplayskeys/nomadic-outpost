import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStrip = price * 100;
  const publishableKey = 'pk_test_nWzctTk8CKw7Ak8V0Xad5aof00BnEhrSY8';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful!');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Nomadic Outpost"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amout={priceForStrip}
      panelLabel="Pay Now"
      token={onToken} // FIXME: Update for live payments
      stripeKey={publishableKey}
      allowRememberMe
    />
  );
};

export default StripeCheckoutButton;
