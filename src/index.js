import React, { StrictMode } from "react"; // Sin llaves para React
import ReactDOM from "react-dom/client";

//CSS
import "./index.css";
import "./App.css";

//Components
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import UserSistem from "./components/userSistem";

import HeroSection from "./components/inicio/heroSection";
import FeaturesSection from "./components/inicio/featuresSection";
import MisionSection from "./components/inicio/misionSection";
import ProductosHeader from "./components/productos/productosHeader";
import Productos from "./components/productos/productos";
import ProductosDownload from "./components/productos/productosDownload";
import HeroSoporte from "./components/soporte/soporteHeader";
import SoporteFeatures from "./components/soporte/soporteFeatures";
import NoticiasHero from "./components/noticias/noticiasHero";
import NoticiasFeatures from "./components/noticias/noticiasFeatures";

//Api
import { descargar } from "./api/api";
import "./api/api.user";
import "./api/api.productos";

//Tester
import reportWebVitals from "./reportWebVitals";
import { apiStatusTest } from "./api/api.test";

//Global variables
window.user = { user: "Unknow", email: "null", name: "Unknow" };
window.logIn = false;

//DOM
const navbarElements = document.querySelectorAll(".navbar-jsx");
const footerElements = document.querySelectorAll(".footer-jsx");
const missionElements = document.querySelectorAll(".mission-jsx");
const heroElements = document.querySelectorAll(".hero-jsx");
const featuresElements = document.querySelectorAll(".features-jsx");
const heroProductos = document.querySelectorAll(".hero-productos-jsx");
const productosElements = document.querySelectorAll(".productos-jsx");
const heroSoporte = document.querySelectorAll(".hero-soporte-jsx");
const featuresSoporte = document.querySelectorAll(".features-soporte-jsx");
const heroNoticias = document.querySelectorAll(".hero-noticias-jsx");
const featuresNoticias = document.querySelectorAll(".features-noticias-jsx");

//User nav menu
const userNavUsername = document.querySelectorAll(".user-system-menu-name");
const userNavEmail = document.querySelectorAll(".user-system-menu-email");

userNavUsername.forEach((e) => (e.textContent = window.user[0]));
userNavEmail.forEach((e) => (e.textContent = window.user[1]));

//Essential elements
navbarElements.forEach((element) => {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <NavBar />
    </React.StrictMode>,
  );
});
footerElements.forEach((element) => {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <Footer />
    </React.StrictMode>,
  );
});

//No essential elements

function initInicio() {
  //Code
  heroElements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <HeroSection />
      </React.StrictMode>,
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  featuresElements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <FeaturesSection />
      </React.StrictMode>,
    );
  });
  missionElements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <MisionSection />
      </React.StrictMode>,
    );
  });

  setTimeout(() => {
    initUserSection();
  }, 10);
}

function initProductos() {
  //Code
  heroProductos.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <ProductosHeader />
      </React.StrictMode>,
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  productosElements.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <Productos />
      </React.StrictMode>,
    );
  });

  //Fn vitales
  setTimeout(() => {
    downloadSection();
  }, 10);
}

function initSoporte() {
  //Code
  heroSoporte.forEach((element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <HeroSoporte />
      </React.StrictMode>,
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  featuresSoporte.forEach((element) => {
    element.style.display = "flex";
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <SoporteFeatures />
      </React.StrictMode>,
    );
  });
}

function initNoticias() {
  //Code
  heroNoticias.forEach((element) => {
    element.style.display = "flex";
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <NoticiasHero />
      </React.StrictMode>,
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  featuresNoticias.forEach((element) => {
    element.style.display = "flex";
    const root = ReactDOM.createRoot(element);
    root.render(
      <React.StrictMode>
        <NoticiasFeatures />
      </React.StrictMode>,
    );
  });
}

let userRoot = null;
let userVisible = false;
function initUserSection() {
  const btnUser = document.querySelector(".login-btn");
  const container = document.querySelector(".user-sistem-sub-jsx");
  if (!btnUser || !container || btnUser.dataset.userSectionInitialized) return;

  btnUser.dataset.userSectionInitialized = "true";
  container.hidden = true;
  btnUser.addEventListener("click", () => {
    if (!userRoot) {
      userRoot = ReactDOM.createRoot(container);
      userRoot.render(
        <StrictMode>
          <UserSistem
            onClose={() => {
              userVisible = false;
              container.hidden = true;
            }}
          />
        </StrictMode>,
      );
    }

    userVisible = !userVisible;
    container.hidden = !userVisible;
  });
}

const estadosRFC = {
  "rfc-conjunto-1": false,
  "rfc-conjunto-2": false,
  "rfc-conjunto-3": false,
  "rfc-conjunto-4": false,
};

[
  ...document.querySelectorAll(".features-soporte-jsx"),
  ...document.querySelectorAll(".hero-noticias-jsx"),
  ...document.querySelectorAll(".features-noticias-jsx"),
  ...document.querySelectorAll(".installer-sub-jsx"),
].forEach((e) => (e.style.display = "none"));

// Inicialización por defecto de la página de inicio
initInicio();

function limpiarVistas() {
  const contenedores = document.querySelectorAll(
    ".hero-jsx, .features-jsx, .mission-jsx, .hero-productos-jsx, .productos-jsx, .hero-soporte-jsx, .features-soporte-jsx",
  );

  contenedores.forEach((elemento) => (elemento.innerHTML = ""));

  [
    ...document.querySelectorAll(".features-soporte-jsx"),
    ...document.querySelectorAll(".hero-noticias-jsx"),
    ...document.querySelectorAll(".features-noticias-jsx"),
    ...document.querySelectorAll(".installer-sub-jsx"),
  ].forEach((e) => (e.style.display = "none"));
}

document.addEventListener("click", (evento) => {
  const enlace = evento.target.closest(".link");

  if (enlace) {
    const dataLink = enlace.dataset.link;

    limpiarVistas();

    if (dataLink === "initInicio") {
      initInicio();
    } else if (dataLink === "initProductos") {
      initProductos();
    } else if (dataLink === "initSoporte") {
      initSoporte();
    } else if (dataLink === "initNoticias") {
      initNoticias();
    } else {
      alert("Error: Page not found, 404. Link =>", dataLink);
      console.error("Error: Page not found, 404. Link =>", dataLink);
    }

    if (estadosRFC[dataLink] !== undefined) {
      estadosRFC[dataLink] = !estadosRFC[dataLink];
      console.log(estadosRFC[dataLink]);
    }
  } else return;
});

// CSS cursor — versión corregida
{
  function updateCardEffect(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

    // Variables por elemento, no globales en :root
    setTimeout(() => {
      element.style.setProperty("--mouse-x", `${mouseX - rect.left}px`);
      element.style.setProperty("--mouse-y", `${mouseY - rect.top}px`);
      element.style.setProperty("--mouse-deg", `${angleDeg}deg`);
      element.style.setProperty("--mouse-distance", `${distance}px`);
    }, 100);
  }
  let [clientX, clientY] = [0, 0];

  document.addEventListener("mousemove", (e) => {
    [clientX, clientY] = [e.clientX, e.clientY];
    document
      .querySelectorAll(".product-card, .feature-card")
      .forEach((el) => updateCardEffect(el, e.clientX, e.clientY));
  });

  document.addEventListener("wheel", () => {
    const absoluteX = clientX + window.scrollX / window.innerWidth;
    const absoluteY = clientY + window.scrollY / window.innerHeight;
    document
      .querySelectorAll(".product-card, .feature-card")
      .forEach((el) => updateCardEffect(el, absoluteX, absoluteY));
  });
}

//Productos download section
let rootDescargas = null;

function downloadSection() {
  let id_producto = null;
  document.addEventListener("click", (evento) => {
    const tarjetaProducto = evento.target.closest(".product-card");
    if (!tarjetaProducto) return;
    id_producto = tarjetaProducto.dataset.producto;

    const contenedorDescarga = document.querySelector(".installer-sub-jsx");
    if (!contenedorDescarga) return;

    contenedorDescarga.style.display = "flex";

    if (!rootDescargas) {
      rootDescargas = ReactDOM.createRoot(contenedorDescarga);
    }

    rootDescargas.render(
      <StrictMode>
        <ProductosDownload />
      </StrictMode>,
    );

    setTimeout(() => {
      contenedorDescarga.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    //Menú
    setTimeout(() => {
      const img_btnMenu = document.querySelector(".dropdown-icon");
      const menu = document.querySelector(".version-list");
      const mainText = document.querySelector(".dropdown-text");
      const listText = document.querySelectorAll(".version-item");

      if (img_btnMenu) {
        img_btnMenu.addEventListener("click", () => {
          const img = img_btnMenu.querySelector("img");
          if (img_btnMenu.dataset.rotate === "0deg") {
            img_btnMenu.dataset.rotate = "180deg";
            img.style.transform = "rotate(180deg)";
            openMenu(true);
          } else if (img_btnMenu.dataset.rotate === "180deg") {
            img_btnMenu.dataset.rotate = "0deg";
            img.style.transform = "rotate(0deg)";
            openMenu(false);
          }
        });
      }

      if (listText && mainText) {
        listText.forEach((e) => {
          e.addEventListener("click", () => {
            const text = e.textContent;
            const text_mainText = mainText.textContent.slice(9);
            //Item
            e.textContent = text_mainText;
            //Main
            mainText.textContent = `INSTALAR ${text}`;
          });
        });

        //Descargar installer
        mainText.addEventListener("click", async () => {
          const version = mainText.textContent.slice(9).toLowerCase();
          await descargar(id_producto, version);
        });
      }

      //Abrir / cerrar menú
      const openMenu = (open) => {
        menu.style.display = open ? "flex" : "none";
      };
    }, 10);
  });
}

//Sistema usuarios

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
console.log(await apiStatusTest());
