import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { User } from "../api/api.user";
import { loginGoogle } from "../api/api";
import UserSistem from "./userSistem";

jest.mock("../api/api.user", () => ({ User: jest.fn() }));
jest.mock("../api/api", () => ({
  getGoogleSession: jest.fn(),
  isGoogleAuthConfigured: jest.fn(() => false),
  loginGoogle: jest.fn(),
  logoutGoogle: jest.fn(),
  onGoogleAuthStateChange: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("inicia sesión y muestra la cuenta recibida del backend", async () => {
  const logIn = jest.fn().mockResolvedValue({
      ok: true,
      data: { name: "Ana", email: "ana@example.com" },
    });
  User.mockImplementation(() => ({ logIn }));

  render(<UserSistem onClose={jest.fn()} />);
  fireEvent.click(
    screen.getByRole("checkbox", {
      name: "Acepto la política de privacidad y condiciones",
    }),
  );
  fireEvent.change(
    screen.getByPlaceholderText("NOMBRE DE USUARIO O EMAIL..."),
    {
      target: { value: "ana" },
    },
  );
  fireEvent.change(screen.getByPlaceholderText(/inserte su contraseña/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "ENTRAR" }));

  expect(await screen.findByRole("heading", { name: "MI CUENTA" })).toBeInTheDocument();
  expect(screen.getByText(/ana \(ana\)/i)).toBeInTheDocument();
  expect(User).toHaveBeenCalledWith("ana", "", "password123", "");
});

test("impide iniciar sesión sin aceptar la política", async () => {
  const logIn = jest.fn();
  User.mockImplementation(() => ({ logIn }));

  render(<UserSistem onClose={jest.fn()} />);
  fireEvent.change(screen.getByPlaceholderText("NOMBRE DE USUARIO O EMAIL..."), {
    target: { value: "ana" },
  });
  fireEvent.change(screen.getByPlaceholderText(/inserte su contraseña/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "ENTRAR" }));

  expect(logIn).not.toHaveBeenCalled();
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Debes aceptar la política de privacidad y condiciones.",
  );
});

test("permite introducir el correo en el campo de inicio de sesión", async () => {
  User.mockImplementation(() => ({
    logIn: jest.fn().mockResolvedValue({
      ok: true,
      data: { user_name: "ana", name: "Ana", email: "ana@example.com" },
    }),
  }));

  render(<UserSistem onClose={jest.fn()} />);
  fireEvent.click(
    screen.getByRole("checkbox", {
      name: "Acepto la política de privacidad y condiciones",
    }),
  );
  fireEvent.change(screen.getByPlaceholderText("NOMBRE DE USUARIO O EMAIL..."), {
    target: { value: "ana@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/inserte su contraseña/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "ENTRAR" }));

  expect(await screen.findByRole("heading", { name: "MI CUENTA" })).toBeInTheDocument();
  expect(User).toHaveBeenCalledWith("ana@example.com", "", "password123", "");
});

test("muestra el error que devuelve el backend al fallar el registro", async () => {
  const newUser = jest.fn().mockResolvedValue({
      ok: false,
      error: "El nombre de usuario ya existe.",
    });
  User.mockImplementation(() => ({ newUser }));

  render(<UserSistem onClose={jest.fn()} />);
  fireEvent.click(
    screen.getByRole("checkbox", {
      name: "Acepto la política de privacidad y condiciones",
    }),
  );
  fireEvent.change(
    screen.getByPlaceholderText("CREE UN NOMBRE DE USUARIO..."),
    { target: { value: "ana" } },
  );
  fireEvent.change(screen.getByPlaceholderText(/cree una contraseña/i), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText(/inserte su email/i), {
    target: { value: "ana@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("INSERTE SU NOMBRE"), {
    target: { value: "Ana" },
  });
  fireEvent.click(screen.getByRole("button", { name: "CREAR CUENTA" }));

  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(
      "El nombre de usuario ya existe.",
    );
  });
});

test("impide crear una cuenta sin aceptar la política", async () => {
  const newUser = jest.fn();
  User.mockImplementation(() => ({ newUser }));

  render(<UserSistem onClose={jest.fn()} />);
  fireEvent.change(
    screen.getByPlaceholderText("CREE UN NOMBRE DE USUARIO..."),
    { target: { value: "ana" } },
  );
  fireEvent.change(screen.getByPlaceholderText(/cree una contraseña/i), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText(/inserte su email/i), {
    target: { value: "ana@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("INSERTE SU NOMBRE"), {
    target: { value: "Ana" },
  });
  fireEvent.click(screen.getByRole("button", { name: "CREAR CUENTA" }));

  expect(newUser).not.toHaveBeenCalled();
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Debes aceptar la política de privacidad y condiciones.",
  );
});

test("no inicia Google OAuth al abrir el panel", () => {
  render(<UserSistem onClose={jest.fn()} />);

  const policyLink = screen.getByRole("link", {
    name: "Leer política y condiciones",
  });
  expect(policyLink).toHaveAttribute(
    "href",
    "https://core-swift.vercel.app/policity-and-privacity.md",
  );
  expect(policyLink).toHaveAttribute("target", "_blank");
  expect(policyLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(
    screen.getByRole("checkbox", {
      name: "Acepto la política de privacidad y condiciones",
    }),
  ).toBeRequired();
  expect(loginGoogle).not.toHaveBeenCalled();
  expect(
    screen.getByRole("button", { name: "Continuar con Google" }),
  ).toBeDisabled();
  expect(screen.getByText(/para activar Google/i)).toBeInTheDocument();
});
