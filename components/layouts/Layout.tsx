import { LoginLayout } from './LoginLayout';
import { AdminLayout } from './AdminLayout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const router = useRouter();
  return router.asPath === '/auth/login' ? (
    <LoginLayout>{children}</LoginLayout>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
};
