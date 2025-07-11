const inputTarea = document.getElementById("tarea") as HTMLInputElement;
const btnAgregar = document.getElementById("agregarBtn") as HTMLButtonElement;
const lista = document.getElementById("listaTareas") as HTMLUListElement;

btnAgregar.addEventListener("click", () => {
  if (inputTarea.value.trim() !== "") {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = inputTarea.value;
    lista.appendChild(nuevaTarea);
    inputTarea.value = "";
  }
});
