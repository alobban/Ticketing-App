import { Publisher, Subjects, TicketUpdatedEvent } from '@al_tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
