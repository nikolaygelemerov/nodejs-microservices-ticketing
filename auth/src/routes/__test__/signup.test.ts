import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return signup();
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '1111',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password (not matching the length)', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'a',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await signup();

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'john@john.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const cookie = await signup();

  expect(cookie).toBeDefined();
});
