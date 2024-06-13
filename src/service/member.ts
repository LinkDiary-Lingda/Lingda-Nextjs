import { GET, POST } from './HttpClient';

export async function joinMember({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const token = await POST({
      path: 'members',
      body: {
        username,
        password,
      },
    });
    return token;
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
    const token = await POST({
      path: 'members/login',
      body: {
        username,
        password,
      },
    });
    return token;
  } catch (error) {
    throw error;
  }
}

export async function refreshAccessToken(token: {
  refreshToken: string;
  accessToken: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/members/issue-access-token`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.accessToken}`,
          refreshToken: token.refreshToken,
        },
        method: 'POST',
      }
    );
    console.log(response, '재발급통신에러 응답 상태!!!!!!');

    if (!response.ok) {
      throw Error('[Network Error] RefreshToken 재발급 통신 에러');
    }

    const tokens = await response.json();

    return tokens;
  } catch (error) {
    console.log(error);
    return {
      error: '[Network Error] RefreshToken 재발급 통신 에러',
    };
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
