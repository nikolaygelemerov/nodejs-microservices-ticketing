import express from 'express';
import 'express-async-errors'; // handles async errors
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from './services';
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes';

const app = express();
app.set('trust proxy', true); // express is aware that is behid the proxy of nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption
    secure: true, // require https
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };