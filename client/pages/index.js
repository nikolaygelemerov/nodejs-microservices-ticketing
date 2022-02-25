import buildClient from '../api/build-client';

const Landing = (props) => {
  console.log('props: ', props);

  const { currentuser } = props;

  return currentuser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

export default Landing;
