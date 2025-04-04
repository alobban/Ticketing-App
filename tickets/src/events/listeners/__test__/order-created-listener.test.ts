import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@al_tickets/common';
import { Message } from 'node-nats-streaming';

import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/tickets';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'askdasdas',
  });
  await ticket.save();

  // Create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'asdasdas',
    expiresAt: 'adsd',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // Create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('sets the orderId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg as Message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});
