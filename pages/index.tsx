/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { HeadPage, Spinner } from '../components/general';
import { Table } from '../components/table';
import { Actions } from '../components/table/Actions';
import { PersonType, PersonTypeTable } from '../helper';
import { personService } from '../services';

import { MdAddCircle, MdOutlineFilterAlt } from 'react-icons/md';
import { ButtonLink } from '../components/buttons';

import { useAppSelector } from '../hook/useRedux';
import { getPerson } from '../redux/';

const Home: NextPage = (): JSX.Element => {
  const personRedux = useAppSelector(getPerson);

  const target = '/person';
  const addTarget = target + '/new';
  const [status, setStatus] = useState<'loading' | 'idle'>('loading');

  const [data, setData] = useState<PersonTypeTable[]>([]);

  function populateTable({ results }: { results: PersonType[] }) {
    const tableData: PersonTypeTable[] = [];
    results.forEach((item) => {
      tableData.push({
        id: item._id ? item._id : '0',
        first_name: item.first_name,
        last_name: item.last_name,
        dni: item.dni,
        sex: item.sex,
        cell_phone: item.cell_phone,
        status: item.status,
        actions: '',
      });
    });
    setData(tableData);
  }

  async function deleteObject(id: string) {
    setStatus('loading');
    await personService.deletePerson(id, personRedux.state.person.token);
    await personService.getPerson(personRedux.state.person.token).then((data) => {
      populateTable({ results: data.data });
    });
    setStatus('idle');
  }

  async function updateObject(id: string) {
    setStatus('loading');
    router.push(`/person/${id}`);
  }

  async function showObject(id: string) {
    setStatus('loading');
    router.push(`/person/show/${id}`);
  }

  const ActionTable: ReactNode = useMemo(
    () =>
      ({ row }: { row: { original: { id: string } } }) =>
        <Actions rowId={row} editAction={updateObject} deleteAction={deleteObject} showAction={showObject} />,
    []
  );

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
      {
        Header: 'Actions',
        accessor: 'actions',
        disableFilters: true,
        Cell: ActionTable,
      },
    ],
    [ActionTable]
  );

  useEffect(() => {
    personService.getPerson(personRedux.state.person.token).then((data) => {
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
      <HeadPage title="Listado Personas" />
      <div className="main-container">
        <Table columns={columns} data={data}>
          <>
            <ButtonLink target={'/person/persona-filtrado'}>
              <MdOutlineFilterAlt />
              Filtrado
            </ButtonLink>
            <ButtonLink target={addTarget}>
              <MdAddCircle />
              Agregar
            </ButtonLink>
          </>
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
        `}
      </style>
    </>
  );
};

export default Home;
