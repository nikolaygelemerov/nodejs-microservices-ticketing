import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      setErrors(null);

      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Something went wrong</h4>
          <ul className="my-0">
            {error.response?.data?.errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
