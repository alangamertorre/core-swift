import { createClient } from "@supabase/supabase-js";

const API_URL =
  process.env.REACT_APP_API_URL || "https://core-swift-rust.onrender.com";
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
let supabase = null;

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Google OAuth no está configurado. Define REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY.",
    );
  }

  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        flowType: "pkce",
        persistSession: false,
        storage: window.sessionStorage,
      },
    });
  }

  return supabase;
}

async function llamar(ruta, datos) {
  let res;
  try {
    res = await fetch(`${API_URL}/${ruta}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor" };
  }

  let payload;
  try {
    payload = await res.json();
  } catch {
    return {
      ok: false,
      error: `El servidor devolvió una respuesta inválida (HTTP ${res.status}).`,
    };
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "El servidor devolvió una respuesta inválida." };
  }

  if (!res.ok) {
    return {
      ...payload,
      ok: false,
      error: payload?.error || `El servidor respondió con HTTP ${res.status}.`,
    };
  }

  return payload;
}

export function managerUser(mode, user_name, extra = {}) {
  return llamar("managerUser", { mode, user_name, ...extra });
}

export function managerProductos(producto, so, version) {
  return llamar("managerProductos", { producto, so, version });
}

export async function listaProductos() {
  try {
    const res = await fetch(`${API_URL}/listaProductos`);
    return await res.json();
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor" };
  }
}

export function detectarSO() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux")) return "linux";
  return null;
}

export async function descargar(producto, version) {
  const so = detectarSO();
  if (!so) return alert("Sistema operativo no soportado");

  const r = await managerProductos(producto, so, version);
  if (r.ok) window.location.href = r.data.url;
  else alert(r.error);
}

export async function listaNoticias() {
  return llamar("managerNoticias");
}

export function isGoogleAuthConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export async function loginGoogle() {
  const { data, error } = await getSupabaseClient().auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;
  return data;
}

export async function getGoogleSession() {
  const { data, error } = await getSupabaseClient().auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onGoogleAuthStateChange(callback) {
  return getSupabaseClient().auth.onAuthStateChange(callback);
}

export async function logoutGoogle() {
  const { error } = await getSupabaseClient().auth.signOut();
  if (error) throw error;
}
