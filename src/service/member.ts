import { GET, POST } from './HttpClient';

export async function joinMember({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const { accessToken } = await POST({
      path: 'members',
      body: {
        username,
        password,
      },
    });
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const accessToken = await POST({
      path: 'members/login',
      body: {
        username,
        password,
      },
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
}

export async function checkDuplicateUser(username: string) {
  try {
    const duplicated = await GET({
      path: `members/check-username-duplicate?username=${username}`,
    });
    return duplicated;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logout(token: string) {
  try {
    const loggedOut = await POST({ path: `members/logout`, token });
    return loggedOut;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
