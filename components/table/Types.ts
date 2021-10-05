import { ReactNode } from 'react';

export type HeaderTableType = {
  Header: string;
  accessor: string;
  disableFilters?: boolean;
  Cell?: ReactNode | undefined;
};

export type TableDataType = {
  id: null | string;
  name: null | string;
  actions: null | string;
};
