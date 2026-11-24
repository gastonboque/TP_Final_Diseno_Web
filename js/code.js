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

const formulario = document.querySelector("#formulario-contacto");
const mensajeFormulario = document.querySelector("#mensaje-formulario");

formulario.addEventListener("submit", async evento => {
  evento.preventDefault();
  formulario.classList.add("was-validated");

  if (!formulario.checkValidity()) {
    return;
  }

  const botonEnviar = formulario.querySelector('button[type="submit"]');
  botonEnviar.disabled = true;
  mensajeFormulario.className = "alert alert-info mt-3";
  mensajeFormulario.textContent = "Enviando mensaje...";

  try {
    const respuesta = await fetch(formulario.action, {
      method: "POST",
      body: new FormData(formulario),
      headers: { Accept: "application/json" }
    });
    const resultado = await respuesta.json();

    if (respuesta.ok && resultado.success) {
      formulario.reset();
      formulario.classList.remove("was-validated");
      mensajeFormulario.className = "alert alert-success mt-3";
      mensajeFormulario.textContent = "Gracias, recibimos tu mensaje.";
    } else {
      mensajeFormulario.className = "alert alert-danger mt-3";
      mensajeFormulario.textContent = "No se pudo enviar el mensaje. Intentá nuevamente.";
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    mensajeFormulario.className = "alert alert-danger mt-3";
    mensajeFormulario.textContent = "No se pudo enviar el mensaje. Intentá nuevamente.";
  }

  botonEnviar.disabled = false;
});
