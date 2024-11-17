export type CreateUserType = {
  username: string;
  email: string;
  password: string;
};
export type LoginUserType = {
  username: string;
  password: string;
};
export type RegisterUserType = {
  username: string;
  password: string;
  email: string;
};
export type AuthUserType = {
  _id: string;
  username: string;
  email: string;
  role: string;
};
