import React from 'react';
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next';
import { AuthContext } from '../../contexts/auth.context';
import { CloudApi } from '../../services';
import { CookieNames } from '../../constants/names.enum';

const Dashboard = ({users}) => {
  const { user } = React.useContext(AuthContext);
  return (
    <div>
      {user && <h1>I am {JSON.stringify(user)}</h1>}
      {users.map((u,i) => <p key={i}>{JSON.stringify(u)}</p>)}
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { [CookieNames.REFRESH_TOKEN]: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const users = (await CloudApi()).data;
  console.log(users);
  return {
    props: {
      users
    }
  }
}