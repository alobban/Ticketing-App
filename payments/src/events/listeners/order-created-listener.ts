import { Listener, OrderCreatedEvent, Subjects } from '@al_tickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, status, userId, version, ticket } = data;

    const order = Order.build({
      id,
      status,
      userId,
      version,
      price: ticket.price,
    });

    // Save the order to the database
    await order.save();

    // Acknowledge the message
    msg.ack();
  }
}
