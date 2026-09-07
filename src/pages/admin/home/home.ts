import { logout } from "../../../utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
console.log({ buttonLogout });
buttonLogout.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  logout();
});
