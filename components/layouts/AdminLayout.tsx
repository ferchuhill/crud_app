import { ReactNode } from 'react';
import { Header } from '../general/Header';

import { useAppSelector } from '../../hook/useRedux';
import { getPerson } from '../../redux/';
import router from 'next/router';

export const AdminLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const personRedux = useAppSelector(getPerson);

  personRedux.state.person.token === '' && router.push('auth/login');

  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <style jsx>
        {`
          .container {
            @apply mx-auto;
          }
        `}
      </style>
    </>
  );
};
