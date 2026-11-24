let contenedor = document.querySelector("#contenedor-proyectos");

// Aca conecto el JSON con las cards
fetch("js/proyectos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    // Aca armo las cards de los proyectos
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
  })
  .catch(error => {
    console.error("No se pudieron cargar los proyectos:", error);
    contenedor.innerHTML =
      '<p class="text-danger mb-0">No se pudieron cargar los proyectos.</p>';
  });

const forms = document.querySelectorAll(".needs-validation");
const mensajeFormulario = document.querySelector("#mensaje-formulario");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Si el formulario es válido, mostramos el mensaje en el div de abajo
      mensajeFormulario.classList.remove("d-none");
      mensajeFormulario.classList.add("alert-success");
      mensajeFormulario.textContent = "Gracias, recibimos tu mensaje.";
    }

    form.classList.add("was-validated");
  });
});