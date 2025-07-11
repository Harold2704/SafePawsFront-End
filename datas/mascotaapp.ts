interface Mascota {
  nombre: string;
  tipo: "perro" | "gato";
  imagen: string;
  descripcion: string;
}

const mascotas: Mascota[] = [
  {
    nombre: "Firulais",
    tipo: "perro",
    imagen: "https://placedog.net/400/280?id=1",
    descripcion: "Un perro muy juguetón y amigable."
  },
  {
    nombre: "Misu",
    tipo: "gato",
    imagen: "https://placekitten.com/400/280",
    descripcion: "Gatita tierna que ama dormir al sol."
  },
  {
    nombre: "Rex",
    tipo: "perro",
    imagen: "https://placedog.net/400/280?id=3",
    descripcion: "Perro guardián, muy leal."
  }
];

const listaMascotas = document.getElementById("listaMascotas") as HTMLElement;
const filtroTipo = document.getElementById("filtroTipo") as HTMLSelectElement;

function mostrarMascotas(filtro: string) {
  listaMascotas.innerHTML = "";

  const filtradas = filtro === "todos" 
    ? mascotas 
    : mascotas.filter(m => m.tipo === filtro);

  filtradas.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${m.imagen}" alt="${m.nombre}">
      <h3>${m.nombre}</h3>
      <p>${m.descripcion}</p>
      <small>Tipo: ${m.tipo}</small>
    `;
    listaMascotas.appendChild(card);
  });
}

filtroTipo.addEventListener("change", () => {
  mostrarMascotas(filtroTipo.value);
});

mostrarMascotas("todos");
