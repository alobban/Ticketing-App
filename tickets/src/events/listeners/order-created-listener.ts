import { Listener, OrderCreatedEvent, Subjects } from '@al_tickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log('Order created event data:', data);
    // Here you can implement any logic you want to perform when an order is created
    // For example, you might want to update the ticket's availability status
    // or send a notification to the user.
  }
}
