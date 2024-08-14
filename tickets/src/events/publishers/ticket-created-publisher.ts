import { Publisher, Subjects, TicketCreatedEvent } from '@al_tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
