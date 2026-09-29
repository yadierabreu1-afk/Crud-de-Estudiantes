const nombre = document.getElementById("nombre");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
const lista = document.getElementById("lista");

// Variable para saber si estamos editando
let estudianteEditando = null;


// AGREGAR / ACTUALIZAR ESTUDIANTE

btnAgregar.addEventListener("click", function () {

    // Validar que el campo no esté vacío
    if (nombre.value.trim() === "") {
        alert("Debe escribir un nombre");
        return;
    }

    // UPDATE - ACTUALIZAR
    if (estudianteEditando !== null) {

        // Cambiamos solo el texto, así no se crea un duplicado
        estudianteEditando.querySelector(".texto").textContent = nombre.value.trim();

        // Quitamos los estilos de edición
        estudianteEditando.classList.remove("editando");
        btnAgregar.classList.remove("modo-editar");

        estudianteEditando = null;
        btnAgregar.textContent = "Agregar";

        nombre.value = "";
        nombre.focus();

        return;
    }


    // CREATE - AGREGAR

    const estudiante = document.createElement("li");

    // Texto del estudiante
    const texto = document.createElement("span");
    texto.classList.add("texto");
    texto.textContent = nombre.value.trim();

    // Contenedor de botones
    const acciones = document.createElement("div");
    acciones.classList.add("acciones");


    // Botón EDITAR

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");

    btnEditar.addEventListener("click", function () {

        // Si había otro estudiante marcado como editando, le quitamos el estilo
        if (estudianteEditando !== null) {
            estudianteEditando.classList.remove("editando");
        }

        nombre.value = texto.textContent;
        nombre.focus();

        estudianteEditando = estudiante;
        estudiante.classList.add("editando");

        btnAgregar.textContent = "Actualizar";
        btnAgregar.classList.add("modo-editar");
    });


    // DELETE - ELIMINAR

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("eliminar");

    btnEliminar.addEventListener("click", function () {

        const confirmar = confirm("¿Está seguro de eliminar este estudiante?");

        if (confirmar) {

            // Si justo se estaba editando este estudiante, cancelamos la edición
            if (estudianteEditando === estudiante) {
                estudianteEditando = null;
                btnAgregar.textContent = "Agregar";
                btnAgregar.classList.remove("modo-editar");
                nombre.value = "";
            }

            estudiante.remove();
        }

    });


    // Agregar botones al contenedor
    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    // Agregar elementos al estudiante
    estudiante.appendChild(texto);
    estudiante.appendChild(acciones);

    // Agregar estudiante a la lista
    lista.appendChild(estudiante);

    // Limpiar campo
    nombre.value = "";
    nombre.focus();

});


// DELETE - LIMPIAR LISTA

btnLimpiar.addEventListener("click", function () {

    if (lista.children.length === 0) {
        alert("La lista ya está vacía");
        return;
    }

    const confirmar = confirm("¿Está seguro de eliminar todos los estudiantes?");

    if (confirmar) {

        lista.innerHTML = "";

        estudianteEditando = null;
        btnAgregar.textContent = "Agregar";
        btnAgregar.classList.remove("modo-editar");
        nombre.value = "";

    }

});