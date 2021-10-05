import type { NextPage } from 'next';
import Head from 'next/head';
import { LoginForm } from '../../components/forms/Login';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </>
  );
};
export default Home;
