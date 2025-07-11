interface Mascota {
  nombre: string;
  tipo: "perro" | "gato";
  imagen: string;
  descripcion: string;
}

let mascotas: Mascota[] = [];

const listaMascotas = document.getElementById("listaMascotas") as HTMLElement;
const filtroTipo = document.getElementById("filtroTipo") as HTMLSelectElement;

// Cargar datos iniciales o de localStorage
function cargarMascotas() {
  const almacenadas = localStorage.getItem("mascotas");
  if (almacenadas) {
    mascotas = JSON.parse(almacenadas);
  } else {
    mascotas = [
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
      }
    ];
    guardarMascotas();
  }
}

function guardarMascotas() {
  localStorage.setItem("mascotas", JSON.stringify(mascotas));
}

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

// Manejo del formulario
const formMascota = document.getElementById("formMascota") as HTMLFormElement;
formMascota.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim();
  const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value.trim();
  const imagen = (document.getElementById("imagen") as HTMLInputElement).value.trim();
  const tipo = (document.getElementById("tipo") as HTMLSelectElement).value as "perro" | "gato";

  if (!nombre || !descripcion || !imagen || !tipo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevaMascota: Mascota = { nombre, descripcion, imagen, tipo };
  mascotas.push(nuevaMascota);
  guardarMascotas();
  mostrarMascotas(filtroTipo.value);

  formMascota.reset();
});

cargarMascotas();
mostrarMascotas("todos");
