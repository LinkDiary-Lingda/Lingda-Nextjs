import { request } from './HttpClient';

export async function joinMember({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const { accessToken } = await request('members', 'POST', {
      username,
      password,
    });
    localStorage.setItem('accessToken', accessToken);
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
    const accessToken = await request('members/login', 'POST', {
      username,
      password,
    });
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkDuplicateUser(username: string) {
  try {
    const duplicated = await request(
      `members/check-username-duplicate?username=${username}`,
      'GET'
    );
    return duplicated;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
