import type { IUser } from "../../../types/IUser";
import { addUser, emailYaRegistrado } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensajeError = document.getElementById(
  "mensaje-error",
) as HTMLParagraphElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  if (emailYaRegistrado(email)) {
    mensajeError.textContent = "Ya existe una cuenta registrada con ese email.";
    return;
  }

  // Todo usuario que se registra por este formulario entra como "client".
  // usuario admin en main.ts para testeo
  const nuevoUsuario: IUser = {
    email,
    password,
    role: "client",
    loggedIn: false,
  };

  addUser(nuevoUsuario);
  navigate("/src/pages/auth/login/login.html");
});
