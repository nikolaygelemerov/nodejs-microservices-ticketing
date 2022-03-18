import express from 'express';
import 'express-async-errors'; // handles async errors
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@ngeltickets/common';

const app = express();

app.set('trust proxy', true); // express is aware that is behind the proxy of nginx (ingress controller)
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption
    secure: process.env.NODE_ENV !== 'test', // require https
  })
);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
