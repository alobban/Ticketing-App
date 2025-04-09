import { PaymentCreatedEvent, Publisher, Subjects } from '@al_tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
