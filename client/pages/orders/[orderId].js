import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_KEY =
  'pk_test_51RC3Nj4KXGSv3yJm3RCGeCox4snGTOq6vRV2uRU8Ebjf0dg7wPfZ1Nw5dFj4lsdzdZ7o7PpqjiicfAEIwljjRAWk00WAryUFPO';

const ShowOrder = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [order.expiresAt]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        key={order.id}
        token={(token) => console.log(token)}
        stripeKey={STRIPE_KEY}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

ShowOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default ShowOrder;
