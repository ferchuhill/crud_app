import { ReactElement, ReactNode } from 'react';

export type SexType = 'Female' | 'Male';
export type StatusType = 'active' | 'inactive' | 'pending';

export interface PersonType {
  id?: string;
  _id?: string;
  first_name: string;
  last_name: string;
  dni?: number;
  sex: 'Female' | 'Male';
  cell_phone: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface PersonType {
  id?: string;
  _id?: string;
  first_name: string;
  last_name: string;
  dni?: number;
  sex: 'Female' | 'Male';
  cell_phone: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface PersonServicesType extends PersonType {
  token: string;
}

export interface PersonStore {
  person: PersonStore | [];
  token: string;
}

export interface GenericIdentityFn {
  <Type>(arg?: Type): Type;
}

export interface PersonTypeTable {
  id: string;
  first_name: string;
  last_name: string;
  dni?: number;
  sex: 'Female' | 'Male';
  cell_phone: string;
  status: 'active' | 'inactive' | 'pending';
  actions: null | string;
}

export type HeaderTableType = {
  Header: string;
  accessor: string;
  disableFilters?: boolean;
  Cell?: ReactNode | undefined;
};

export interface ButtonInterface {
  children: ReactElement | ReactNode | string;
  disabled?: boolean;
  target: string;
  primary?: boolean;
}
