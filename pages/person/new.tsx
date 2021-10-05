import { NextPage } from 'next';
import { PersonForm } from '../../components/forms/Person';
import { HeadPage } from '../../components/general';
import Head from 'next/head';

const New: NextPage = () => {
  return (
    <>
      <Head>
        <title>BEST APP</title>
        <meta name="description" content="BEST APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadPage title="Nueva Personas" />
      <PersonForm />
    </>
  );
};
export default New;
