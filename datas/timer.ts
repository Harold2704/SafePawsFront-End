let contador = 10;
const tiempo = document.getElementById("tiempo")!;
const interval = setInterval(() => {
  contador--;
  tiempo.textContent = contador.toString();
  if (contador === 0) clearInterval(interval);
}, 1000);
