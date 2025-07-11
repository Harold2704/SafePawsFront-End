const p = document.getElementById("visitas")!;
let visitas = localStorage.getItem("contador");
let num = visitas ? parseInt(visitas) + 1 : 1;
localStorage.setItem("contador", num.toString());
p.textContent = `${num} veces.`;
