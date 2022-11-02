// console user

export type User = {
  id: string;
  username: string;
  hackable: boolean;
  hacked: boolean;
  root: boolean;
  password: string;
  menuIds: string[];
}