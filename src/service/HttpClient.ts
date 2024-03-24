export const request = (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
  revalidate: number = 0,
  params?: any
) => {
  const accessToken = localStorage.getItem('accessToken');
  return fetch(`${process.env.BASE_URL}/${path}`, {
    method,
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
    next: { revalidate },
    body,
  }).then((res) => res.json());
};
