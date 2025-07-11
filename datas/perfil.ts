const nombreElemento = document.getElementById("nombreUsuario") as HTMLParagraphElement;
const btnMostrar = document.getElementById("mostrarNombre") as HTMLButtonElement;

btnMostrar.addEventListener("click", () => {
  nombreElemento.textContent = "Christopher Del Carpio";
});
