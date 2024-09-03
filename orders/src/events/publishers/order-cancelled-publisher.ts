import { OrderCancelledEvent, Publisher, Subjects } from '@al_tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
