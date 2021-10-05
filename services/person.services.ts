// import Router from 'next/router';

import { PersonServicesType } from '../helper';

export const personService = {
  getPerson,
  getPersonFilter,
  getPersonId,
  savePerson,
  deletePerson,
  updatePerson,
};
const { NEXT_PUBLIC_API_URL = 'localhost:3000/api' } = process.env;

async function getPerson(token: string): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { ...authHeader(token) },
  };
  return fechtApi(url, requestOptions);
}

async function getPersonFilter(token: string): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person/filter-male-pending`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { ...authHeader(token) },
  };
  return fechtApi(url, requestOptions);
}

async function getPersonId(id: string, token: string): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person/${id}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { ...authHeader(token) },
  };
  return fechtApi(url, requestOptions);
}

async function savePerson({
  first_name,
  last_name,
  dni,
  sex,
  cell_phone,
  status,
  token,
}: PersonServicesType): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person`;
  const data = new URLSearchParams();
  data.append('first_name', first_name);
  data.append('last_name', last_name);
  dni && data.append('dni', dni.toString());
  data.append('sex', sex);
  data.append('cell_phone', cell_phone.toString());
  data.append('status', status);

  const requestOptions: RequestInit = {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', ...authHeader(token) },
    credentials: 'include',
    body: data,
  };
  return fechtApi(url, requestOptions);
}

async function updatePerson({
  id,
  first_name,
  last_name,
  dni,
  sex,
  cell_phone,
  status,
  token,
}: PersonServicesType): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person`;

  const data = new URLSearchParams();
  id && data.append('_id', id);
  data.append('first_name', first_name);
  data.append('last_name', last_name);
  dni && data.append('dni', dni.toString());
  data.append('sex', sex);
  cell_phone && data.append('cell_phone', cell_phone.toString());
  data.append('status', status);

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', ...authHeader(token) },
    credentials: 'include',
    body: data,
  };
  return fechtApi(url, requestOptions);
}

async function deletePerson(personId: string, token: string): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/person`;
  const data = new URLSearchParams();
  data.append('id', personId);

  const requestOptions: RequestInit = {
    method: 'delete',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', ...authHeader(token) },
    credentials: 'include',
    body: data,
  };
  return fechtApi(url, requestOptions);
}

async function fechtApi(url: string, requestOptions: RequestInit): Promise<any> {
  const response: Response = await fetch(url, requestOptions);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return Promise.resolve(data);
  });
}

function authHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
