// CheckoutForm.js
import React, { useState, useEffect } from "react";
import {
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { getIntent } from "../../../apis/Payment/stripe";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
function PaymentFormStripe() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") != null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const stripePromise = loadStripe("pk_test_51Q828URsYTtz9iNpjGU8JRUf72NQsjlQ8d1sRLeDu1k8tvtfSwlTigP3YZ49SpfSELU4XzxR2ZDuRSM07I4julBc00Nt3Rkbd4");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const res = getIntent()
      .then((res) => {
        console.log("data")
        console.log(res.data.data)
        setClientSecret(res.data.data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(res.data.data.dpmCheckerLink);
      });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!isLogin) navigate("/login");
    const cart = localStorage.getItem("cart");
    // if (elements == null) {
    //   return;
    // }

    // // Trigger form validation and wallet collection
    // const {error: submitError} = await elements.submit();
    // if (submitError) {
    //   // Show error to your customer
    //   setErrorMessage(submitError.message);
    //   return;
    // }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint

    // const {client_secret: clientSecret} = await res.json();

    // const {error} = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: 'https://example.com/order/123/complete',
    //   },
    // });

    // if (error) {
    //   // This point will only be reached if there is an immediate error when
    //   // confirming the payment. Show error to your customer (for example, payment
    //   // details incomplete)
    //   setErrorMessage(error.message);
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };
  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';
  return ( 
    clientSecret && (
      <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise} >
        <CheckoutForm dpmCheckerLink={dpmCheckerLink}/>
      </Elements>)
  );
}
 
export default PaymentFormStripe;