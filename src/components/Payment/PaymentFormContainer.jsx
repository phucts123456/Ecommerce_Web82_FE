import PaymentFormStripe from "./Stripe/PaymentFormStripe"
import {
    Elements,
  } from '@stripe/react-stripe-js';
  import {loadStripe} from '@stripe/stripe-js';
function PaymentFormContainer() {
    const stripePromise = loadStripe('pk_test_51Q828URsYTtz9iNpjGU8JRUf72NQsjlQ8d1sRLeDu1k8tvtfSwlTigP3YZ49SpfSELU4XzxR2ZDuRSM07I4julBc00Nt3Rkbd4');

    const options = {
      mode: 'payment',
      amount: 1099,
      currency: 'usd',
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };
    return  <>
        <Elements stripe={stripePromise} options={options}>
            <PaymentFormStripe />
        </Elements>
    </>
}

export default PaymentFormContainer