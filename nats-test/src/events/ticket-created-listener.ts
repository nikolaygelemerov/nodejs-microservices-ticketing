import { Message } from 'node-nats-streaming';

import { Listener } from './base-listeners';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message): void {
    console.log('Event data!', data);

    msg.ack();
  }
}
