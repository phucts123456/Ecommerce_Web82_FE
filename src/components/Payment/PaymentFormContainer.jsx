import constants from '../../data/constants'

import PaymentFormStripe from "./Stripe/PaymentFormStripe"
function PaymentFormContainer({paymentId}) {
    const render = () => {
      switch (paymentId) {
        case constants.CONST_PAYMENT_TYPE_STRIPE_PAYMENT_ID:
          return <PaymentFormStripe/>
          break;
      
        default:
          return ""
          break;
      }
    }
    return render();
}

export default PaymentFormContainer