import { listaProductos } from "./api";

const STORAGE_URL = `${process.env.REACT_APP_SUPERBASE_STORAGE_URL}/productos`;
const CONFIG_URL = `${STORAGE_URL}/index.json`;

class Producto {
  constructor(
    raw_name = "",
    basePath = "",
    name = "",
    imgPath = "",
    descriptionPath = "",
    id = 1,
    data_json = "",
  ) {
    this.raw_name = raw_name;
    this.name = name;
    this.basePath = basePath;
    this.imgPath = imgPath;
    this.descriptionPath = descriptionPath;
    this.id = id;
    this.versionsJson = data_json;
  }
}

async function getCatalogoProductos() {
  if (!STORAGE_URL || !CONFIG_URL) {
    return [];
  }

  try {
    const response = await fetch(CONFIG_URL);
    if (!response.ok) {
      return [];
    }

    const catalogo = await response.json();
    return Array.isArray(catalogo?.productos) ? catalogo.productos : [];
  } catch (error) {
    console.error("No se pudo cargar el catálogo de productos:", error);
    return [];
  }
}

export async function getProductos() {
  const catalogoProductos = await getCatalogoProductos();
  const res = await listaProductos();
  const productosDisponibles = Array.isArray(res?.data) ? res.data : [];

  return catalogoProductos.map((productoCatalogo, index) => {
    const infoRes = productosDisponibles[index] || {};
    const basePath = `${STORAGE_URL}/${productoCatalogo.path}`;

    return new Producto(
      infoRes.raw_name || productoCatalogo.raw_name || "",
      basePath,
      infoRes.name || productoCatalogo.name || "Producto",
      `${basePath}/icon-1.png`,
      `${basePath}/README.md`,
      infoRes.id || index + 1,
      infoRes.data_json || productoCatalogo.data_json || "",
    );
  });
}
