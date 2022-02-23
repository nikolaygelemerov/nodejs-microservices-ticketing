import { useCallback, useState } from 'react';
import Router from 'next/router';

import { useRequest } from '../../hooks';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  console.log('errors: ', errors);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      await doRequest();
    },
    [doRequest]
  );

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="form-control"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
