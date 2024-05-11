export interface LoginInputs {
  username: string;
  password: string;
}

export interface AuthSession {
  user: { name?: string };
  accessToken: string;
  refreshToken: string;
}
