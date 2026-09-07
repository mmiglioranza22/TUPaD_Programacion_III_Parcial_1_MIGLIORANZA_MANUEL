import type { IUser } from "../../../types/IUser";
import { findUser, saveUser } from "../../../utils/localStorage";
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

  const usuarioEncontrado = findUser(email, password);

  if (!usuarioEncontrado) {
    mensajeError.textContent = "Email o contraseña incorrectos.";
    return;
  }

  const usuarioSesion: IUser = { ...usuarioEncontrado, loggedIn: true };
  saveUser(usuarioSesion);

  if (usuarioSesion.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});
