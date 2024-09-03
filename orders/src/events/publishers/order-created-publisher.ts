import { OrderCreatedEvent, Publisher, Subjects } from '@al_tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
