import Link from 'next/link';
import { ButtonInterface } from '../../helper';

export const ButtonLink = ({ children, disabled = false, target, primary = true }: ButtonInterface): JSX.Element => {
  const theme = primary ? 'primary' : 'secundary';
  const targetText = disabled === false ? target : '#';
  return (
    <>
      <Link href={targetText}>
        <a className={theme}>{children}</a>
      </Link>

      <style jsx>
        {`
          a {
            @apply select-none cursor-pointer py-2 px-4 rounded text-sm flex items-center  justify-center;
            @apply focus:outline-none focus:ring-1;
            width: 140px;
            height: 34px;
            transition: opacity 0.3s ease;
          }

          a.primary {
            @apply bg-blue-500 text-gray-50 border-blue-300;
            @apply hover:border-blue-600 hover:text-white hover:bg-blue-600  focus:border-blue-600 focus:ring-blue-600;
            @apply active:bg-blue-500;
          }

          a.secundary {
            @apply bg-gray-300 text-gray-900;
            @apply hover:border-gray-600 hover:bg-gray-400  focus:border-white focus:ring-white;
          }

          a[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }

          a > :global(svg) {
            @apply mr-1;
          }
        `}
      </style>
    </>
  );
};
