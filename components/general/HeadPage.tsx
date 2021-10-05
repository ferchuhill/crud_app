export const HeadPage = ({ title, subtitle = '' }: { title: string; subtitle?: string }): JSX.Element => (
  <>
    <h1>{title}</h1>
    {subtitle !== '' && <p className="subtitle">{subtitle}</p>}

    <hr />
    <style jsx>
      {`
        h1 {
          @apply h-5;
        }
        .subtitle {
          @apply italic text-sm my-2;
        }
        hr {
          @apply my-5 border-blue-900;
        }
      `}
    </style>
  </>
);
