const noticias = ["Nuevo producto lanzado", "Evento virtual confirmado", "Actualización de software"];
const lista = document.getElementById("listaNoticias")!;
noticias.forEach(n => {
  const li = document.createElement("li");
  li.textContent = n;
  lista.appendChild(li);
});
