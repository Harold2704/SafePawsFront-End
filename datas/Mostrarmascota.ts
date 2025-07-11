function mostrarMascotas(filtro: string) {
  listaMascotas.innerHTML = "";

  const filtradas = filtro === "todos" 
    ? mascotas 
    : mascotas.filter(m => m.tipo === filtro);

  filtradas.forEach((m, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${m.imagen}" alt="${m.nombre}">
      <h3>${m.nombre}</h3>
      <p>${m.descripcion}</p>
      <small>Tipo: ${m.tipo}</small>
      <br>
      <button class="adoptarBtn" data-index="${index}">Adoptar</button>
    `;
    listaMascotas.appendChild(card);
  });

  document.querySelectorAll(".adoptarBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt((e.target as HTMLElement).getAttribute("data-index")!);
      mascotas.splice(index, 1);
      guardarMascotas();
      mostrarMascotas(filtroTipo.value);
    });
  });
}
