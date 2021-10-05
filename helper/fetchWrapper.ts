// import getConfig from 'next/config';

// import { userService } from '../services';

// const { publicRuntimeConfig } = getConfig();

// export const fetchWrapper = {
//   get,
//   post,
//   put,
//   delete: _delete,
// };

// async function executefetch(url:string, requestOptions:RequestInit): Promise<void> | string[]{
//     const response: Response = await fetch(url, requestOptions);
//     return handleResponse(response);
// }

// async function get(url: string): Promise<void> | string[] {
//   const requestOptions: RequestInit = {
//     method: 'GET',
//     headers: authHeader(url),
//   };
//   return await executefetch(url,requestOptions)
// }

// function post(url: string, body: string | string[]): Promise<void | Response> {
//   const requestOptions: RequestInit = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', ...authHeader(url) },
//     credentials: 'include',
//     body: JSON.stringify(body),
//   };
//   return fetch(url, requestOptions).then(handleResponse:Response);
// }

// function put(url: string, body: string | string[]): Promise<void | Response> {
//   const requestOptions: RequestInit = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json', ...authHeader(url) },
//     body: JSON.stringify(body),
//   };
//   return fetch(url, requestOptions).then(handleResponse);
// }

// // prefixed with underscored because delete is a reserved word in javascript
// function _delete(url: string): Promise<void | Response> {
//   const requestOptions: RequestInit = {
//     method: 'DELETE',
//     headers: authHeader(url),
//   };
//   return fetch(url, requestOptions).then(handleResponse);
// }

// // helper functions

// function authHeader(url: string): HeadersInit {
//   // return auth header with jwt if user is logged in and request is to the api url
//   const user = userService.userValue;
//   const isLoggedIn = user && user.token;
//   const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${user.token}` };
//   } else {
//     return {};
//   }
// }

// function handleResponse(response: Response): Promise<void> | string[] {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);

//     if (!response.ok) {
//       if ([401, 403].includes(response.status) && userService.userValue) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         // userService.logout();
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
