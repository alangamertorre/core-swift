export async function apiStatusTest() {
  const inicio = performance.now();
  const API_URL = `${
    process.env.REACT_APP_API_URL || "https://core-swift-rust.onrender.com"
  }/listaProductos`;

  try {
    const res = await fetch(API_URL, {
      signal: AbortSignal.timeout(10000), // corta a los 8 segundos
    });
    const json = await res.json();
    const ms = Math.round(performance.now() - inicio);

    return {
      title: "API SERVICE",
      online: res.ok && json.ok === true,
      status: res.status,
      ms,
      error: json.ok ? "code=0" : (json.error ?? "Respuesta inesperada"),
    };
  } catch (e) {
    return {
      online: false,
      status: 0,
      ms: Math.round(performance.now() - inicio),
      error:
        e.name === "TimeoutError"
          ? "Tiempo de espera agotado"
          : "No se pudo conectar",
    };
  }
}
