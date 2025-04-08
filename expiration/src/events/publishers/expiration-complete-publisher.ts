import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@al_tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
