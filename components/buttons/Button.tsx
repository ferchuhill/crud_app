import { ReactElement, ReactNode } from 'react';
import { GenericIdentityFn } from '../../helper';

interface ButtonInterface {
  children: ReactElement | ReactNode | string;
  disabled?: boolean;
  onClick?: GenericIdentityFn | undefined;
  type?: 'primary' | 'secundary';
  typeButton?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  disabled = false,
  onClick = undefined,
  typeButton = 'submit',
  type = 'primary',
}: ButtonInterface): JSX.Element => {
  return (
    <>
      <>
        {onClick ? (
          <button className={type} type={typeButton} disabled={disabled} onClick={() => onClick()}>
            {children}
          </button>
        ) : (
          <button className={type} type={typeButton} disabled={disabled}>
            {children}
          </button>
        )}
      </>
      <style jsx>
        {`
          button {
            @apply select-none cursor-pointer py-2 px-4 rounded text-sm flex flex-col justify-center items-center;
            @apply focus:outline-none focus:ring-1;
            transition: opacity 0.3s ease;
            min-width: 140px;
            height: 34px;
          }

          button.primary {
            @apply bg-blue-500 text-gray-50 border-blue-300;
            @apply hover:border-blue-600 hover:text-white hover:bg-blue-600  focus:border-blue-600 focus:ring-blue-600;
            @apply active:bg-blue-500;
          }

          button.secundary {
            @apply bg-gray-300 text-gray-900;
            @apply hover:border-gray-600 hover:bg-gray-400  focus:border-white focus:ring-white;
          }

          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }

          button > :global(svg) {
            @apply mr-1;
            width: 24px;
          }
        `}
      </style>
    </>
  );
};
