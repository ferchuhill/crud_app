import { ReactElement } from 'react';

export const Spinner = ({ children = undefined }: { children?: ReactElement | undefined }): JSX.Element => {
  return (
    <>
      <div className={'message_container'}>
        <div className="loading-spiner">
          <div className="spinner"></div>
          {children && children}
        </div>
      </div>
      <style jsx>
        {`
          .message_container {
            @apply flex justify-center items-center text-sm w-full;
            animation: fadeIn linear 7s;
            animation: fadeOut linear 7s;
          }

          .loading-spiner {
            @apply p-10 flex items-center justify-center h-64 w-full rounded;
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: rgba(39, 99, 235);
            animation: spin 1s ease infinite;
            margin-right: 5px;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
