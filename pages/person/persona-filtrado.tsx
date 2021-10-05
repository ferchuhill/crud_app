import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { ButtonLink } from '../../components/buttons';
import { HeadPage, Spinner } from '../../components/general';
import { Table } from '../../components/table';
import { PersonType } from '../../helper';
import { personService } from '../../services';

import { useAppSelector } from '../../hook/useRedux';
import { getPerson } from '../../redux/';

const HomeFiltrado: NextPage = () => {
  const personRedux = useAppSelector(getPerson);

  const [status, setStatus] = useState<'loading' | 'idle'>('loading');

  const [data, setData] = useState<PersonType[]>([]);

  function populateTable({ results }: { results: PersonType[] }) {
    const tableData: PersonType[] = [];
    results.forEach((item) => {
      tableData.push({
        id: item._id ? item._id : '0',
        first_name: item.first_name,
        last_name: item.last_name,
        dni: item.dni,
        sex: item.sex,
        cell_phone: item.cell_phone,
        status: item.status,
      });
    });
    setData(tableData);
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'first_name',
      },
      {
        Header: 'Apellido',
        accessor: 'last_name',
      },
      {
        Header: 'DNI',
        accessor: 'dni',
      },
      {
        Header: 'Estado',
        accessor: 'status',
      },
    ],
    []
  );

  useEffect(() => {
    personService.getPersonFilter(personRedux.state.person.token).then((data) => {
      populateTable({ results: data.data });
      setStatus('idle');
    });
  }, []);

  return (
    <>
      <Head>
        <title>BEST APP</title>
        <meta name="description" content="BEST APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadPage title="Listado Personas Filtradas" />
      <div className="main-container">
        <Table columns={columns} data={data}>
          <ButtonLink target={'/'}>
            <MdKeyboardBackspace />
            Volver
          </ButtonLink>
        </Table>
        {status === 'loading' && (
          <div className="spiner-login">
            <Spinner />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .main-container {
            @apply w-full h-full relative;
          }
          .spiner-login {
            @apply absolute top-0 left-0 w-full h-full;
          }
          .actions {
            @apply flex justify-end ml-2;
          }
        `}
      </style>
    </>
  );
};

export default HomeFiltrado;
