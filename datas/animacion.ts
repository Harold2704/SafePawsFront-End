const cuadro = document.getElementById("cuadro")!;
const mover = document.getElementById("mover")!;
mover.addEventListener("click", () => {
  cuadro.animate([{ left: '0px' }, { left: '300px' }], {
    duration: 1000,
    fill: 'forwards'
  });
});
