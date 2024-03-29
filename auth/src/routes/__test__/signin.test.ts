import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@john.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await global.signup();

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@john.com',
      password: 'password',
    })
    .expect(201);
});

it('responds with a cookie when given valid credentials', async () => {
  await global.signup();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'john@john.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
