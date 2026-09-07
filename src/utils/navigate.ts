export const navigate = (route: string): void => {
  // Se resuelve SIEMPRE contra el origen del sitio (window.location.origin) para evitar que la ruta se concatene (se limpia y se sobreescribe entera)
  const url = new URL(route, window.location.origin);
  window.location.replace(url.toString());
};
