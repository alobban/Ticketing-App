import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@al_tickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { id, orderId, stripeId } = data;

    console.log('Payment created event data:', data);

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Update the order status to 'Completed' or whatever is appropriate
    order.set({ status: OrderStatus.Complete });

    await order.save();

    // Acknowledge the message after processing
    msg.ack();
  }
}
