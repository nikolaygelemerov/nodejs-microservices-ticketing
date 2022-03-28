import express from 'express';
import 'express-async-errors'; // handles async errors
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  createTicketRouter,
  showTicketRouter,
  shoAllTicketsRouter,
  updateTicketRouter,
} from './routes';

import { currentUser, errorHandler, NotFoundError } from '@ngeltickets/common';

const app = express();

app.set('trust proxy', true); // express is aware that is behind the proxy of nginx (ingress controller)
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption
    secure: process.env.NODE_ENV !== 'test', // require https
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(shoAllTicketsRouter);
app.use(updateTicketRouter);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
