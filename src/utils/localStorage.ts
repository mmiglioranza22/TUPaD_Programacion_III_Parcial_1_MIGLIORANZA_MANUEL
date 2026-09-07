import type { IUser } from "../types/IUser";

const USERS_KEY = "users";

export const getUsers = (): IUser[] => {
  const usuarios = localStorage.getItem(USERS_KEY);
  return usuarios ? (JSON.parse(usuarios) as IUser[]) : [];
};

export const saveUsers = (usuarios: IUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
};

export const addUser = (usuario: IUser): void => {
  const usuarios = getUsers();
  usuarios.push(usuario);
  saveUsers(usuarios);
};

export const emailYaRegistrado = (email: string): boolean => {
  const usuarios = getUsers();
  return usuarios.some((u) => u.email === email);
};

export const findUser = (
  email: string,
  password: string
): IUser | undefined => {
  const usuarios = getUsers();
  return usuarios.find((u) => u.email === email && u.password === password);
};

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};
