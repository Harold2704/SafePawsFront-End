const contenedor = document.getElementById("contenedor")!;
for (let i = 1; i <= 3; i++) {
  const img = document.createElement("img");
  img.src = `https://picsum.photos/200?random=${i}`;
  contenedor.appendChild(img);
}
