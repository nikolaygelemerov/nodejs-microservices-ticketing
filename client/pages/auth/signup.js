import { useCallback, useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      console.log(response.data);
    },
    [email, password]
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
