export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  status: number;
  role?: string;
}
