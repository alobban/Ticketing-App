import { useEffect, useState } from 'react';

const ShowOrder = ({ order }) => {
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

  return <div>Time left to pay: {timeLeft} seconds</div>;
};

ShowOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default ShowOrder;
