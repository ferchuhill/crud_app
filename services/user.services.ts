import Router from 'next/router';

export const userService = {
  login,
  logout,
};
const { NEXT_PUBLIC_API_URL = 'localhost:3000/api' } = process.env;

async function login({ username, password }: { username: string; password: string }): Promise<any> {
  const url = `${NEXT_PUBLIC_API_URL}/authenticate`;
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  };
  const response: Response = await fetch(url, requestOptions);

  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        Router.push('/auth/login');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return Promise.resolve(data);
  });
}

function logout(): void {
  Router.push('/auth/login');
}
