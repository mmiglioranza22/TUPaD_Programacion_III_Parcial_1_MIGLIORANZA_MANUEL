import type { IUser } from "./types/IUser";
import { logout } from "./utils/auth";
import { addUser, getUSer, getUsers } from "./utils/localStorage";
import { navigate } from "./utils/navigate";

export const RUTA_LOGIN = "/src/pages/auth/login/login.html";

const seedAdmin = (): void => {
  const usuarios = getUsers();
  const existeAdmin = usuarios.some((u) => u.role === "admin");

  if (!existeAdmin) {
    const admin: IUser = {
      email: "admin@foodstore.com",
      password: "admin123",
      role: "admin",
      loggedIn: false,
    };
    addUser(admin);
  }
};

const protegerRuta = (): void => {
  const path = window.location.pathname;
  const esRutaAdmin = path.includes("/admin/");
  const esRutaClient = path.includes("/client/");

  // deja accesible las rutas públicas
  if (!esRutaAdmin && !esRutaClient) {
    return;
  }

  const sesionGuardada = getUSer();

  if (!sesionGuardada) {
    navigate(RUTA_LOGIN);
    return;
  }

  let usuario: IUser;
  try {
    usuario = JSON.parse(sesionGuardada) as IUser;
  } catch {
    //redirige a login si se manipula la URL a mano
    navigate(RUTA_LOGIN);
    return;
  }

  const rolNoCoincide =
    (esRutaAdmin && usuario.role !== "admin") ||
    (esRutaClient && usuario.role !== "client");

  if (rolNoCoincide) {
    navigate(RUTA_LOGIN);
    return;
  }
};

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  logout();
});

seedAdmin();
protegerRuta();
