import { Listener, OrderCreatedEvent, Subjects } from '@al_tickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Order created event data!', data);

    // ack the message
    msg.ack();
  }
}
