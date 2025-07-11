function mostrarMascotas(filtro: string) {
  listaMascotas.innerHTML = "";

  const texto = buscador.value.toLowerCase();

  const filtradas = mascotas.filter(m =>
    (filtro === "todos" || m.tipo === filtro) &&
    m.nombre.toLowerCase().includes(texto)
  );

  // resto del código...
}
