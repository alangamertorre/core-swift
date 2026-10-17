import React, { useEffect, useState } from "react";
import { User } from "../api/api.user";
import {
  getGoogleSession,
  isGoogleAuthConfigured,
  loginGoogle,
  logoutGoogle,
  onGoogleAuthStateChange,
} from "../api/api";

function errorMessage(error) {
  return error instanceof Error
    ? error.message
    : "No se pudo completar la operación. Inténtalo de nuevo.";
}

export default function UserSistem({ onClose }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authProvider, setAuthProvider] = useState("backend");
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const googleAuthConfigured = isGoogleAuthConfigured();

  useEffect(() => {
    if (!googleAuthConfigured) return undefined;

    let active = true;
    let subscription;
    try {
      const response = onGoogleAuthStateChange((event, session) => {
        if (!active) return;
        if (session) {
          setCurrentUser(session.user);
          setAuthProvider("google");
        } else if (event === "SIGNED_OUT") {
          setCurrentUser(null);
        }
      });
      subscription = response.data.subscription;
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
      return undefined;
    }

    getGoogleSession()
      .then((session) => {
        if (active && session) {
          setCurrentUser(session.user);
          setAuthProvider("google");
        }
      })
      .catch((error) => {
        if (active) setStatus({ type: "error", message: errorMessage(error) });
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [googleAuthConfigured]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const userName = form.get("user_name").trim();
    const password = form.get("password");

    try {
      const user = new User(userName, "", password, "");
      const result = await user.logIn();
      if (!result.ok) {
        setStatus({
          type: "error",
          message: result.error || "No se pudo iniciar sesión.",
        });
        return;
      }

      const profile =
        result.data && typeof result.data === "object" ? result.data : {};
      setCurrentUser({
        ...profile,
        user_name: profile.user_name || userName,
      });
      setAuthProvider("backend");
      setAccountName(profile.name || "");
      setAccountEmail(profile.email || "");
      setCurrentPassword("");
      setNewPassword("");
      setDeletePassword("");
      setStatus({ type: "success", message: "Sesión iniciada correctamente." });
      formElement.reset();
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const userName = form.get("user_name").trim();
    const password = form.get("password");
    const email = form.get("email").trim();
    const name = form.get("name").trim();

    try {
      const user = new User(userName, email, password, name);
      const result = await user.newUser();
      if (!result.ok) {
        setStatus({
          type: "error",
          message: result.error || "No se pudo crear la cuenta.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Cuenta creada. Ya puedes iniciar sesión.",
      });
      formElement.reset();
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setStatus(null);
    try {
      await loginGoogle();
      setStatus({ type: "success", message: "Redirigiendo a Google..." });
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function handleAccountUpdate(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const user = new User(
        currentUser.user_name,
        accountEmail.trim(),
        currentPassword,
        accountName.trim(),
      );
      const result = await user.updateUser(newPassword || undefined);
      if (!result.ok) {
        setStatus({
          type: "error",
          message: result.error || "No se pudo actualizar la cuenta.",
        });
        return;
      }

      setCurrentUser((profile) => ({
        ...profile,
        name: accountName.trim(),
        email: accountEmail.trim(),
      }));
      setCurrentPassword("");
      setNewPassword("");
      setStatus({ type: "success", message: "Cuenta actualizada." });
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function handleAccountDelete(event) {
    event.preventDefault();
    if (!window.confirm("¿Seguro que quieres eliminar tu cuenta?")) return;

    setLoading(true);
    setStatus(null);
    try {
      const user = new User(currentUser.user_name, "", deletePassword, "");
      const result = await user.deleteUser();
      if (!result.ok) {
        setStatus({
          type: "error",
          message: result.error || "No se pudo eliminar la cuenta.",
        });
        return;
      }

      setCurrentUser(null);
      setDeletePassword("");
      setStatus({ type: "success", message: "Cuenta eliminada." });
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogout() {
    setLoading(true);
    setStatus(null);
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setStatus({ type: "success", message: "Sesión cerrada." });
    } catch (error) {
      setStatus({ type: "error", message: errorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  function handleLocalLogout() {
    setCurrentUser(null);
    setCurrentPassword("");
    setNewPassword("");
    setDeletePassword("");
    setStatus({ type: "success", message: "Sesión cerrada." });
  }

  return (
    <div className="user-system">
      <div className="user-system-back">
        <button
          className="user-system-back-button"
          type="button"
          onClick={onClose}
          aria-label="Cerrar panel de usuario"
        >
          <img className="user-system-back-image" src="/back.svg" alt="" />
          <span className="user-system-back-text">VOLVER</span>
        </button>
      </div>

      {currentUser ? (
        <section className="user-system-account" aria-labelledby="account-title">
          <h2 className="user-system-account-title" id="account-title">
            MI CUENTA
          </h2>
          <p className="user-system-account-identity">
            {currentUser.name || currentUser.user_metadata?.full_name || ""}
            {currentUser.user_name || currentUser.email
              ? ` (${currentUser.user_name || currentUser.email})`
              : ""}
          </p>
          {authProvider === "google" ? (
            <button
              className="user-system-login-submit"
              type="button"
              disabled={loading}
              onClick={handleGoogleLogout}
            >
              CERRAR SESIÓN
            </button>
          ) : (
            <>
              <form className="user-system-account-form" onSubmit={handleAccountUpdate}>
                <h3>EDITAR CUENTA</h3>
                <label>
                  Nombre
                  <input
                    autoComplete="name"
                    maxLength="100"
                    required
                    value={accountName}
                    onChange={(event) => setAccountName(event.target.value)}
                  />
                </label>
                <label>
                  Email
                  <input
                    autoComplete="email"
                    maxLength="254"
                    required
                    type="email"
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                  />
                </label>
                <label>
                  Contraseña actual
                  <input
                    autoComplete="current-password"
                    required
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </label>
                <label>
                  Nueva contraseña (opcional)
                  <input
                    autoComplete="new-password"
                    maxLength="30"
                    minLength="8"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </label>
                <button
                  className="user-system-login-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                </button>
              </form>
              <form className="user-system-delete-form" onSubmit={handleAccountDelete}>
                <h3>ELIMINAR CUENTA</h3>
                <label>
                  Confirma tu contraseña
                  <input
                    autoComplete="current-password"
                    required
                    type="password"
                    value={deletePassword}
                    onChange={(event) => setDeletePassword(event.target.value)}
                  />
                </label>
                <button type="submit" disabled={loading}>
                  {loading ? "ELIMINANDO..." : "ELIMINAR CUENTA"}
                </button>
              </form>
              <button
                className="user-system-login-submit"
                type="button"
                disabled={loading}
                onClick={handleLocalLogout}
              >
                CERRAR SESIÓN
              </button>
            </>
          )}
        </section>
      ) : (
        <>
          <section className="user-system-login" aria-labelledby="login-title">
            <form className="user-system-login-form" onSubmit={handleLogin}>
              <h2 className="user-system-login-title" id="login-title">
                INICIAR SESIÓN
              </h2>
              <input
                autoComplete="username"
                className="user-system-login-username"
                name="user_name"
                placeholder="INSERTE SU NOMBRE DE USUARIO..."
                required
                type="text"
              />
              <input
                autoComplete="current-password"
                className="user-system-login-password"
                name="password"
                placeholder="INSERTE SU CONTRASEÑA..."
                required
                type="password"
              />
              <button className="user-system-login-submit" type="submit" disabled={loading}>
                <span className="user-system-login-submit-text">
                  {loading ? "ESPERA..." : "ENTRAR"}
                </span>
              </button>
            </form>
            <div className="user-system-login-google">
              <button
                className="user-system-login-google-button"
                type="button"
                disabled={loading || !googleAuthConfigured}
                onClick={handleGoogleLogin}
                aria-label="Continuar con Google"
              >
                <img
                  className="user-system-login-google-image"
                  src="/google.svg"
                  alt="Continuar con Google"
                />
              </button>
            </div>
          </section>

          <section className="user-system-register" aria-labelledby="register-title">
            <form className="user-system-register-form" onSubmit={handleRegister}>
              <h2 className="user-system-register-title" id="register-title">
                CREAR CUENTA
              </h2>
              <input
                autoComplete="username"
                className="user-system-register-username"
                name="user_name"
                placeholder="CREE UN NOMBRE DE USUARIO..."
                required
                type="text"
              />
              <input
                autoComplete="new-password"
                className="user-system-register-password"
                maxLength="30"
                minLength="8"
                name="password"
                placeholder="CREE UNA CONTRASEÑA..."
                required
                type="password"
              />
              <input
                autoComplete="email"
                className="user-system-register-email"
                name="email"
                placeholder="INSERTE SU EMAIL..."
                required
                type="email"
              />
              <input
                autoComplete="name"
                className="user-system-register-name"
                name="name"
                placeholder="INSERTE SU NOMBRE"
                required
                type="text"
              />
              <button className="user-system-register-submit" type="submit" disabled={loading}>
                <span className="user-system-register-submit-text">
                  {loading ? "ESPERA..." : "CREAR CUENTA"}
                </span>
              </button>
            </form>
            <div className="user-system-register-google">
              <button
                className="user-system-register-google-button"
                type="button"
                disabled={loading || !googleAuthConfigured}
                onClick={handleGoogleLogin}
                aria-label="Registrarse con Google"
              >
                <img
                  className="user-system-register-google-image"
                  src="/google.svg"
                  alt="Registrarse con Google"
                />
              </button>
            </div>
          </section>
          {!googleAuthConfigured && (
            <p className="user-system-google-help">
              Para activar Google, configura REACT_APP_SUPABASE_URL y
              REACT_APP_SUPABASE_ANON_KEY.
            </p>
          )}
        </>
      )}

      {status && (
        <p
          className={`user-system-status user-system-status-${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
