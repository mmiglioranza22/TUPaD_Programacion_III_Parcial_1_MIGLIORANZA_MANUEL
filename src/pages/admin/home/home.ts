import { logout } from "../../../utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  logout();
});
