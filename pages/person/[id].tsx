import { useRouter } from 'next/router';
import Head from 'next/head';

import { NextPage } from 'next';
import { PersonForm } from '../../components/forms/Person';
import { HeadPage } from '../../components/general';
import { useEffect, useState } from 'react';
import { personService } from '../../services';

import { useAppSelector } from '../../hook/useRedux';
import { getPerson } from '../../redux/';

const New: NextPage = () => {
  const personRedux = useAppSelector(getPerson);

  const router = useRouter();
  const { id } = router.query;
  const [object, setObject] = useState();

  const findPerson = async (id: string) => {
    const value = await personService.getPersonId(id, personRedux.state.person.token);
    setObject(value.data);
  };

  useEffect(() => {
    if (id) {
      const personId = Array.isArray(id) ? id[0] : id;
      findPerson(personId);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>BEST APP</title>
        <meta name="description" content="BEST APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadPage title="Editar Persona" />
      <PersonForm data={object} edit={true} />
    </>
  );
};
export default New;
