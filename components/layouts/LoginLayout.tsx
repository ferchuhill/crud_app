import { ReactNode } from 'react';

export const LoginLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="inner">{children}</div>
        </div>
      </div>
      <style jsx>
        {`
          .page {
            @apply bg-gray-200 h-screen w-screen font-sans text-sm;
          }
          .container {
            @apply px-4  m-auto flex flex-1 h-full flex-col pt-20 items-center;
            @apply sm:justify-center sm:px-0 sm:mt-0 sm:pt-0;
          }

          .inner {
            @apply w-3/4 lg:w-1/2;
          }
        `}
      </style>
    </>
  );
};
