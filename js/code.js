// Aca selecciono el contenedor vacio donde se van a cargar los proyectos del json
let contenedor = document.querySelector("#contenedor-proyectos");

// Aca conecto los proyectos del json con las tarjetas
fetch("js/proyectos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    // Aca recorro cada proyecto del json y armo las tarjetas
    datos.forEach(proyecto => {
      contenedor.innerHTML += `
        <div class="col">
          <article class="tarjeta-proyecto">
            <a
              class="enlace-tarjeta"
              href="${proyecto.pagina}"
              aria-label="Ver proyecto: ${proyecto.titulo}"
            >
              <div class="imagen-tarjeta">
                <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
              </div>
              <div class="informacion-tarjeta">
                <div class="texto-tarjeta">
                  <h3 class="titulo-seccion fs-5 mb-2">${proyecto.titulo}</h3>
                  <p class="mb-0">${proyecto.descripcion}</p>
                </div>
              </div>
              <span class="anio-proyecto">${proyecto.anio}</span>
            </a>
          </article>
        </div>
      `;
    });
  });

// Constantes para la validación del formulario
const forms = document.querySelectorAll(".needs-validation");
const mensajeFormulario = document.querySelector("#mensaje-formulario");

// Aca valido el formulario de contacto
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    // Si falta completar algo o esta mal escrito se frena el envio
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Si el formulario es válido, muestro el mensaje en el div de abajo
      mensajeFormulario.classList.remove("d-none");
      mensajeFormulario.classList.add("alert-success");
      mensajeFormulario.textContent = "Gracias, recibimos tu mensaje.";
    }

    // Aca activo los estilos visuales estandar de validacion de bootstrap
    form.classList.add("was-validated");
  });
});