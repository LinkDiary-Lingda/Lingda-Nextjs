export const GET = async ({
  path,
  token,
}: {
  path: string;
  token?: string;
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw Error(res.status.toString());
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const POST = async ({
  path,
  body,
  token,
}: {
  path: string;
  body?: any;
  token?: string;
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw Error(res.status.toString());
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const DELETE = async ({
  path,
  body,
  token,
}: {
  path: string;
  body?: any;
  token?: string;
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw Error(res.status.toString());
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const PUT = async ({
  path,
  body,
  token,
}: {
  path: string;
  body?: any;
  token?: string;
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: token ? `Bearer ${token}` : '',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw Error(res.status.toString());
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
