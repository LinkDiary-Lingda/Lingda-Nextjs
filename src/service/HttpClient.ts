import { error } from 'console';

export const request = (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
  revalidate: number = 0,
  params?: any
) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    credentials: 'include',
    next: { revalidate },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw Error(res.status.toString());
      return result;
    })
    .catch((error) => {
      console.log(error);
      throw error.message;
    });
};
