import React from 'react';
import Checkout from './Checkout';


class Stripe extends React.Component {
 
  render() {
  
      return (
        <div>
          This is stripe test demo file.
          <Checkout
            name={'Payment information'}
            description={'direct to pay'}
            amount={2250}
          />
       
        </div>
      );
    }
  }
export default Stripe;