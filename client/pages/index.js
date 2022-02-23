import axios from 'axios';

const Landing = ({ currentUser }) => {
  console.log('currentUser: ', currentUser);

  return <h1>Landing {color}</h1>;
};

Landing.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');

  return response.data;
};

export default Landing;
