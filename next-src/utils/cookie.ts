export function setCookie(name: string, value: string, days?: Date, path: string = "/") {
  let expires = "";
  if (days) {
    expires = `; expires=${days.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=${path}`;
}

export function getCookie(name: string): string | undefined {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return undefined;
}
