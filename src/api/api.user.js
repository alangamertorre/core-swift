import * as api from "./api.js";

// Contraseñas demasiado comunes (se comparan en minúsculas)
const PASSWORDS_INSEGURAS = [
  "12345",
  "qwerty",
  "12345678",
  "abcdefgh",
  "0987654321",
  "09876543",
  "asdfghjk",
];

// Valida una contraseña NUEVA. Devuelve { ok, error }
// (mismo formato que la API, así el resto del código lo trata igual)
function validarPassword(password) {
  if (typeof password !== "string") {
    return {
      ok: false,
      error: "Error 400: Invalid Password. ERR_400_PASSWORD_INPUT_NOT_STRING",
    };
  }

  const longitud = [...password].length;
  if (longitud < 8 || longitud > 30) {
    return {
      ok: false,
      error:
        "Error 400: La contraseña debe tener un mínimo de 8 caracteres y un máximo de 30",
    };
  }

  if (PASSWORDS_INSEGURAS.includes(password.toLowerCase())) {
    return {
      ok: false,
      error: "Error 400: La contraseña es muy insegura, escoge otra",
    };
  }

  return { ok: true, error: null };
}

// Todos los métodos son async y devuelven { ok, data } o { ok, error }
export class User {
  constructor(user_name, email, password, name) {
    this.user_name = user_name;
    this.email = email;
    this.password = password;
    this.name = name;
    this.data = null; // datos del usuario tras login/get
  }

  // ---------- Registro ----------
  async newUser() {
    const v = validarPassword(this.password);
    if (!v.ok) return v; // no se llama a la API si la contraseña no vale

    return api.managerUser("register", this.user_name, {
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }

  // ---------- Login ----------
  // Aquí NO se aplican las reglas de contraseña nueva: solo el servidor
  // sabe si la contraseña es correcta.
  async logIn() {
    const r = await api.managerUser("login", this.user_name, {
      password: this.password,
    });
    if (r.ok) this.data = r.data; // el login ya devuelve los datos del usuario
    return r;
  }

  // ---------- Leer usuario ----------
  async getUser() {
    const r = await api.managerUser("get", this.user_name);
    if (r.ok) this.data = r.data;
    return r;
  }

  // ---------- Modificar ----------
  // this.password = contraseña ACTUAL. new_password es opcional.
  // Los campos undefined no se envían y el servidor deja el valor que había.
  async updateUser(new_password) {
    if (new_password !== undefined) {
      const v = validarPassword(new_password);
      if (!v.ok) return v;
    }

    return api.managerUser("update", this.user_name, {
      password: this.password,
      email: this.email,
      name: this.name,
      new_password,
    });
  }

  // ---------- Borrar ----------
  async deleteUser() {
    const r = await api.managerUser("delete", this.user_name, {
      password: this.password,
    });
    if (r.ok) this.data = null;
    return r;
  }
}
